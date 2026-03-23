"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Reservation } from "@/lib/supabase/types";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  confirmed: "bg-green-500/20 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30",
  completed: "bg-blue-500/20 text-blue-300 border-blue-500/30",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
  completed: "Completada",
};

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const fetchReservations = async () => {
    try {
      const url =
        filter === "all"
          ? "/api/reservations"
          : `/api/reservations?status=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      setReservations(data.reservations || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [filter]);

  const updateStatus = async (
    id: string,
    status: "pending" | "confirmed" | "cancelled" | "completed",
  ) => {
    try {
      await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchReservations();
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const todayCount = reservations.filter(
    (r) => r.date === new Date().toISOString().split("T")[0],
  ).length;

  const pendingCount = reservations.filter(
    (r) => r.status === "pending",
  ).length;

  const confirmedCount = reservations.filter(
    (r) => r.status === "confirmed",
  ).length;

  return (
    <div className="min-h-screen bg-bethel-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              Bethel Bellini Admin
            </h1>
            <p className="text-white/50 mt-1">Panel de Reservaciones</p>
          </div>
          <Button onClick={fetchReservations} variant="outline" size="sm">
            Actualizar
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass p-4">
            <p className="text-white/50 text-sm">Total</p>
            <p className="text-3xl font-bold text-white">
              {reservations.length}
            </p>
          </div>
          <div className="glass p-4">
            <p className="text-white/50 text-sm">Hoy</p>
            <p className="text-3xl font-bold text-bethel-cyan">{todayCount}</p>
          </div>
          <div className="glass p-4">
            <p className="text-white/50 text-sm">Pendientes</p>
            <p className="text-3xl font-bold text-yellow-400">{pendingCount}</p>
          </div>
          <div className="glass p-4">
            <p className="text-white/50 text-sm">Confirmadas</p>
            <p className="text-3xl font-bold text-green-400">
              {confirmedCount}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["all", "pending", "confirmed", "cancelled", "completed"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                  filter === status
                    ? "bg-bethel-cyan text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {status === "all" ? "Todas" : STATUS_LABELS[status]}
              </button>
            ),
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="glass p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-bethel-cyan border-t-transparent rounded-full mx-auto" />
          </div>
        ) : reservations.length === 0 ? (
          <div className="glass p-8 text-center text-white/50">
            No hay reservaciones
          </div>
        ) : (
          <div className="glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">
                      Nombre
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">
                      Teléfono
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">
                      Fecha
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">
                      Hora
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">
                      Personas
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">
                      Estado
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-white/5">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-white">
                            {reservation.name}
                          </p>
                          {reservation.email && (
                            <p className="text-sm text-white/50">
                              {reservation.email}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <a
                          href={`https://wa.me/${reservation.country_code}${reservation.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-bethel-cyan hover:underline"
                        >
                          {reservation.country_code} {reservation.phone}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-white/70">
                        {reservation.date}
                      </td>
                      <td className="px-4 py-4 text-white/70">
                        {reservation.time}
                      </td>
                      <td className="px-4 py-4 text-white/70">
                        {reservation.guests}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-1 text-xs border ${STATUS_COLORS[reservation.status]}`}
                        >
                          {STATUS_LABELS[reservation.status]}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          {reservation.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateStatus(reservation.id, "confirmed")
                                }
                                className="text-xs px-2 py-1 bg-green-500/20 text-green-300 hover:bg-green-500/30"
                              >
                                Confirmar
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(reservation.id, "cancelled")
                                }
                                className="text-xs px-2 py-1 bg-red-500/20 text-red-300 hover:bg-red-500/30"
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                          {reservation.status === "confirmed" && (
                            <button
                              onClick={() =>
                                updateStatus(reservation.id, "completed")
                              }
                              className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                            >
                              Completar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
