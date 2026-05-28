export function formatDuration(minutes: number | null | undefined): string {
   if (!minutes) return "—";
   const h = Math.floor(minutes / 60);
   const m = minutes % 60;
   if (h === 0) return `${m} хв`;
   if (m === 0) return `${h} год`;
   return `${h} год ${m} хв`;
}

function parseDate(dateStr: string): Date {
   if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Date(`${dateStr}T00:00:00`);
   }
   return new Date(dateStr);
}

export function formatDate(dateStr: string | null | undefined): string {
   if (!dateStr) return "—";
   const d = parseDate(dateStr);
   if (isNaN(d.getTime())) return "—";
   return d.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
   });
}

export function formatDateLong(dateStr: string | null | undefined): string {
   if (!dateStr) return "—";
   const d = parseDate(dateStr);
   if (isNaN(d.getTime())) return "—";
   return d.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
   });
}

export function formatRating(rating: number | null | undefined): string {
   if (rating === null || rating === undefined) return "—";
   return Number.isInteger(rating) ? String(rating) : rating.toFixed(1);
}

export function formatTime(seconds: number): string {
   const h = Math.floor(seconds / 3600);
   const m = Math.floor((seconds % 3600) / 60);
   const s = Math.floor(seconds % 60);
   const mm = String(m).padStart(2, "0");
   const ss = String(s).padStart(2, "0");
   if (h > 0) return `${h}:${mm}:${ss}`;
   return `${mm}:${ss}`;
}
