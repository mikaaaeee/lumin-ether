import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary rounded-full p-8">
        <NotebookIcon className="size-10 text-secondary" />
      </div>
      <h3 className="text-2xl font-bold text-secondary"> No Notes yet</h3>
      <p className="text-white">
        Ready to organize your thoughts? Create your first note to get started
        on your journey.
      </p>
      <Link to="/create" className="btn btn-primary text-white">
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
