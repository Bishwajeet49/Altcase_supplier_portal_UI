const origin = window.location.origin;
const hostname = window.location.hostname;

// Determine environment

export let isProd = origin === "https://fitizen-organizer-prod.netlify.app";
export let isUAT = origin === "https://organizer-fitizenindia.netlify.app" || hostname === "localhost";

export const PRODUCTION= "PRODUCTION";
export const UAT= "UAT"

export const environment = isProd ? PRODUCTION : isUAT ? UAT : "Unknown";

export const baseUrl = isProd ? "https://fitizen.dsaadmin.in/prod" : "https://fitizen.dsaadmin.in";