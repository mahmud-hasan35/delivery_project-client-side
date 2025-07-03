import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [searchId, setSearchId] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["trackingParcel", searchId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/${searchId}`);
      if (!res.data || (Array.isArray(res.data) && res.data.length === 0)) {
        throw new Error("No tracking info found");
      }
      if (Array.isArray(res.data)) {
        const sorted = res.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        return sorted[0];
      }
      return res.data;
    },
    enabled: !!searchId,
    retry: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim() !== "") {
      setSearchId(trackingId.trim());
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Track a Parcel</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID (e.g. PCL-20250703-IVL0A)"
          className="input input-bordered w-full mb-2"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Track
        </button>
      </form>

      {isLoading && <p>Loading tracking info...</p>}

      {error && (
        <p className="text-red-600">
          Error: Could not find tracking info for ID "{searchId}"
        </p>
      )}

      {data && (
        <div className="bg-gray-100 p-4 rounded-md shadow">
          <h3 className="text-xl font-semibold mb-2">
            Latest Tracking Info for {searchId}
          </h3>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
          <p>
            <strong>Details:</strong> {data.details}
          </p>
          <p>
            <strong>Updated By:</strong> {data.updated_by}
          </p>
          <p>
            <strong>Timestamp:</strong>{" "}
            {new Date(data.timestamp).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackParcel;
