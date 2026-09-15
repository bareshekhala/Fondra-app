import { useContext, useEffect, useState } from "react";
import { Search, Copy } from "lucide-react";

import service from "@/services/index.service.js";
import { AuthContext } from "@/context/auth.context.jsx";
import { toast } from "@/components/ui/toast.jsx";
import Avatar from "@/components/shared/Avatar.jsx";
import showError from "@/utils/showError.js";


function FindPeople({ circle, requests, sent, onChanged }) {
  const { user } = useContext(AuthContext); 
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [busy, setBusy] = useState(false);



  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  // for searching 
  const searchPeople = async () => {
    const q = query.trim();

    if (q.length < 2) {
      setResults([]);
      return;
    }

    try {
      const response = await service.get(`/connections/search?q=${q}`);
      setResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    searchPeople();
  }, [query]);

// here we want to know the relation between two users, did I send a request? did she send me a request? or is she in my circle? or there is nothing?
  const getRelation = (otherUser) => {
    if (circle.some((u) => u._id === otherUser._id)) {
      return "circle";
    }
    if (sent.some((r) => r.recipient._id === otherUser._id)) {
      return "sent";
    }
    if (requests.some((r) => r.requester._id === otherUser._id)) {
      return "received";
    }
    return "none";
  };

  //to send a request to someone 
  const handleAdd = async (otherUser) => {
    setBusy(true);
    try {
      await toast.promise(service.post(`/connections/request/${otherUser._id}`), {
        loading: "Sending request…",
        success: "Request sent",
        error: showError,
      });
      onChanged();
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };


// each user has a unique invite code which is generated when she signs up and it can be found in the User.model.
// -> I can copy this code and give it to someone and if she signs up using this code, the connection between us will be created automatically -> this is the part we can copy our code
  const handleCopyInvite = async () => {
    try {
      await navigator.clipboard.writeText(user.inviteCode);
      toast.add({ type: "success", description: "Invite code copied" });
    } catch (error) {
      console.log(error);
      toast.add({ type: "error", description: "Couldn't copy the code" });
    }
  };

  return (

    <section className="glass-card p-5">
      <h2 className="font-serif text-2xl italic text-[#211B3D] dark:text-foreground">
        Find people
      </h2>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-2.5 rounded-full border border-black/8 bg-white px-4 py-3 dark:border-white/12 dark:bg-white/5">
          <Search size={16} className="shrink-0 text-muted-foreground dark:text-[#9C92C4]" />

          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Username or email"
            className="w-full bg-transparent text-[15px] font-medium text-[#211B3D] outline-none placeholder:text-muted-foreground dark:text-foreground dark:placeholder:text-[#9C92C4]"
          />
        </label>

        <button
          type="button"
          onClick={handleCopyInvite}
          className="flex shrink-0 items-center justify-center gap-2 rounded-full border border-dashed border-[#7C6BD4]/40 px-4 py-3 text-xs font-bold text-[#7C6BD4] transition hover:bg-[#7C6BD4]/5 dark:border-[#A38DF0]/40 dark:text-[#A38DF0] dark:hover:bg-white/5"
        >
          <Copy size={14} />
          Copy invite code
        </button>
      </div>


      {results.length > 0 ? (
        <ul className="mt-2 border-t border-black/5 dark:border-white/10">
          {results.map((otherUser) => {
            const relation = getRelation(otherUser);

            return (
              <li key={otherUser._id} className="flex items-center gap-3 py-3">
                <Avatar user={otherUser} size={44} />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#211B3D] dark:text-foreground">
                    {otherUser.name}
                  </p>

                  <p className="truncate text-xs font-medium text-muted-foreground dark:text-[#9C92C4]">
                    @{otherUser.username}
                    {relation === "circle" ? " · already in your circle" : null}
                    {relation === "sent" ? " · request sent" : null}
                    {relation === "received" ? " · asked to join your circle" : null}
                  </p>
                </div>

                {relation === "none" ? (
                  <button
                    type="button"
                    onClick={() => handleAdd(otherUser)}
                    disabled={busy}
                    className="pink-button shrink-0 py-2 text-xs disabled:opacity-50"
                  >
                    Add to circle
                  </button>
                ) : (
                  <span className="shrink-0 rounded-full border border-black/8 px-3.5 py-2 text-xs font-bold text-muted-foreground dark:border-white/15 dark:text-[#9C92C4]">
                    {relation === "circle" ? "In circle" : null}
                    {relation === "sent" ? "Pending" : null}
                    {relation === "received" ? "See requests" : null}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}

      {query.trim().length >= 2 && results.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground dark:text-[#9C92C4]">
          Nobody with that name yet 
        </p>
      ) : null}

      <p className="mt-3 text-xs text-muted-foreground dark:text-[#9C92C4]">
        Type at least 2 letters. Or copy your invite code: anyone who signs up
        with it lands straight in your circle.
      </p>
    </section>
  );
}

export default FindPeople;
