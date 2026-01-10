import { useEffect, useState } from "react";

function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/quotes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setQuotes(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Quotes fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) return <p>Loading quotes...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quote Requests</h1>

      {quotes.length === 0 ? (
        <p>No quotes found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q._id}>
                <td className="border p-2">{q.name}</td>
                <td className="border p-2">{q.email}</td>
                <td className="border p-2">{q.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminQuotes;
