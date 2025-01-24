import { useGetAlbums } from "@/api/album/hook";
import PlaylistsSkeleton from "@/components/skeletons/PlaylistsSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useMusicStore from "@/zustand/useMusicStore";
import { HomeIcon, LibraryIcon, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  const { setAlbums } = useMusicStore();
  const { data: albums, isLoading: isAlbumsLoading } = useGetAlbums();

  useEffect(() => {
    if (albums) {
      setAlbums(albums);
    }
  }, [albums, setAlbums]);

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation Menu */}
      <div className="bg-zinc-900 rounded-lg p-4">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <Link
            to={"/chat"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <MessageCircle className="mr-2 size-5" />
            <span className="hidden md:inline">Messages</span>
          </Link>
        </div>
      </div>

      {/* Library Menu */}
      <div className="flex-1 rounded-lg p-4 bg-zinc-900">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-white p-2">
            <LibraryIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-2">
            {!isAlbumsLoading && albums ? (
              albums.map((album) => (
                <Link
                  key={album._id}
                  to={`/album/${album._id}s`}
                  className="p-2 hover:bg-zinc-800 rounded-mg flex items-center gap-3 group cursor-pointer"
                >
                  <img
                    src={album.imageUrl}
                    alt="Playlist img"
                    className="size-12 rounded-md flex-shrink-0 object-cover"
                  />

                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      Album ． {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <PlaylistsSkeleton />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSideBar;
