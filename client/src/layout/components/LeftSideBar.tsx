import { useGetAlbums } from "@/api/album/hook";
import PlaylistsSkeleton from "@/components/skeletons/PlaylistsSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSettingStore } from "@/zustand/useSettingsStore";
import {
  HomeIcon,
  LibraryIcon,
  MessageCircle,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  const { t } = useTranslation();
  const isMobile = useSettingStore((state) => state.isMobile);
  const { data: albums, isLoading: isAlbumsLoading } = useGetAlbums();

  const links = [
    {
      name: t("HOME.TITLE"),
      icon: HomeIcon,
      path: "/",
    },
    {
      name: t("SETTING.TITLE"),
      icon: SettingsIcon,
      path: "/setting",
    },
    {
      name: t("CHAT.TITLE"),
      icon: MessageCircle,
      path: "/chat",
    },
    {
      name: t("SEARCH.TITLE"),
      icon: SearchIcon,
      path: "/search",
    },
  ];

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation Menu */}
      <div
        className={cn("bg-transparent md:bg-zinc-900 rounded-lg p-4 w-full")}
      >
        <div className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                })
              )}
            >
              <link.icon className="mr-2 size-5" />
              <span className="inline">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {isMobile && <div className="border-t border-zinc-800 h-10 mt-5 -mb-5" />}

      {/* Library Menu */}
      <div className="flex-1 rounded-lg p-4 bg-transparent md:bg-zinc-900">
        <div className="flex justify-between items-center mb-4">
          <div className="flex justify-center md:justify-start items-center text-white p-2">
            <LibraryIcon className="mr-2 size-5" />
            <span className="inline">{t("LAYOUT.PLAYLIST")}</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-2">
            {!isAlbumsLoading && albums ? (
              albums.map((album) => (
                <Link
                  key={album._id}
                  to={`/album/${album._id}`}
                  className="p-2 hover:bg-zinc-800 rounded-mg flex items-center gap-3 group cursor-pointer"
                >
                  <img
                    src={album.imageUrl}
                    alt="Playlist img"
                    className="size-12 rounded-md flex-shrink-0 object-cover"
                  />

                  <div className="flex-1 min-w-0">
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
