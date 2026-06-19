import type { Station } from "@/types";
import stationsData from "@/data/stations.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

export async function fetchStations(params?: {
  province?: string;
  district?: string;
  powerType?: string;
  status?: string;
}): Promise<Station[]> {
  if (USE_MOCK || !API_URL) {
    let list = stationsData as Station[];
    if (params?.province) {
      list = list.filter((s) => s.province === params.province);
    }
    if (params?.district) {
      list = list.filter((s) => s.district === params.district);
    }
    if (params?.powerType) {
      list = list.filter((s) => s.powerType === params.powerType);
    }
    if (params?.status) {
      list = list.filter((s) => s.status === params.status);
    }
    return list;
  }

  const search = new URLSearchParams();
  if (params?.province) search.set("province", params.province);
  if (params?.district) search.set("district", params.district);
  if (params?.powerType) search.set("power_type", params.powerType);
  if (params?.status) search.set("status", params.status);

  const res = await fetch(`${API_URL}/api/v1/stations?${search}`);
  if (!res.ok) throw new Error("Stations fetch failed");
  return res.json();
}

export async function submitContact(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}): Promise<{ ok: boolean }> {
  const payload = {
    name: data.name,
    email: data.email,
    message: data.message,
    ...(data.company ? { company: data.company } : {}),
  };

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Contact submit failed");
  }
  return { ok: true };
}
