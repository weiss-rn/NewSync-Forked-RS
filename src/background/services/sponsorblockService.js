// ==================================================================================================
// EXTERNAL SERVICE - SPONSORBLOCK
// ==================================================================================================

const SPONSORBLOCK_ENDPOINT = 'https://sponsor.ajay.app/api/skipSegments';
const DEFAULT_CATEGORIES = [
  "sponsor",
  "selfpromo",
  "interaction",
  "intro",
  "outro",
  "preview",
  "filler",
  "music_offtopic"
];

async function computeHashPrefix(videoId, prefixLength = 4) {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(videoId);
  const digest = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(digest));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.slice(0, prefixLength);
}

async function buildSponsorBlockUrl(videoId, categories) {
  const hashPrefix = await computeHashPrefix(videoId);
  const params = new URLSearchParams();
  params.set('categories', JSON.stringify(categories));
  return `${SPONSORBLOCK_ENDPOINT}/${hashPrefix}?${params.toString()}`;
}

function extractSegmentsFromResponse(videoId, data) {
  if (!Array.isArray(data)) {
    return [];
  }

  const hasVideoObjects = data.length > 0 && data[0]?.videoID;
  if (!hasVideoObjects) {
    return data;
  }

  const record = data.find(item => item.videoID === videoId);
  return Array.isArray(record?.segments) ? record.segments : [];
}

export class SponsorBlockService {
  static async fetch(videoId) {
    if (!videoId) return [];

    try {
      const url = await buildSponsorBlockUrl(videoId, DEFAULT_CATEGORIES);
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          console.log(`No SponsorBlock segments for videoId: ${videoId}`);
          return [];
        }
        throw new Error(`SponsorBlock API error: ${response.statusText}`);
      }

      const data = await response.json();
      return extractSegmentsFromResponse(videoId, data);
    } catch (error) {
      console.error("SponsorBlock error:", error);
      return [];
    }
  }
}
