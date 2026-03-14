import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import RateLimitUI from "../components/RateLimitUI";
import api from "../components/lib/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const HomePage = () => {
  //will take entire screen (min-h-screen)
  const [isRateLimit, setRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      //define logic
      //1. create try & catch block
      try {
        //fecth API
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setRateLimit(false); //cz able to get the data
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error);
        if (error.response?.status === 429) {
          setRateLimit(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimit && <RateLimitUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading notes....
          </div>
        )}

        {notes.length === 0 && !isRateLimit && <NotesNotFound />}

        {notes.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
