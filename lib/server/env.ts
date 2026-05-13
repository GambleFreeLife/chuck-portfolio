export function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getOptionalEnv(name: string) {
  return process.env[name] || null;
}

export function getVideoSinglePriceId() {
  return getRequiredEnv("STRIPE_VIDEO_SINGLE_PRICE_ID");
}

export function getVideoPackPriceId() {
  return getRequiredEnv("STRIPE_VIDEO_PACK_PRICE_ID");
}

export function getVideoRetainerPriceId() {
  return getRequiredEnv("STRIPE_VIDEO_RETAINER_PRICE_ID");
}
