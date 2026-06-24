export async function detectSystem() {
  const d = {};

  try {
    if (navigator.gpu) {
      const adapter = await navigator.gpu.requestAdapter();
      if (adapter) {
        const info = adapter.info;
        if (info) {
          d.gpu = info.description || [info.vendor, info.architecture, info.device].filter(Boolean).join(" ");
        }
      }
    }
  } catch {}

  if (navigator.deviceMemory) {
    d.ram = navigator.deviceMemory + " GB";
  }

  try {
    const parts = [];
    if (navigator.hardwareConcurrency) {
      parts.push(navigator.hardwareConcurrency + " thread");
    }
    if (navigator.userAgentData?.getHighEntropyValues) {
      const hints = await navigator.userAgentData.getHighEntropyValues(["architecture", "platformVersion"]);
      if (hints.architecture) parts.unshift(hints.architecture);
    }
    if (parts.length > 0) {
      d.cpu = parts.join(" ");
    }
  } catch {}

  return d;
}
