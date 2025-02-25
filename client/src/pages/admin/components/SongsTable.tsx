import { useDeleteSong } from "@/api/admin/hook";
import { SONG_API_PORTOCAL } from "@/api/song/protocol";
import { STATS_API_PORTOCAL } from "@/api/stats/protocol";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Song } from "@/type/song";
import { useAlert } from "@/zustand/useAlert";
import useMusicStore from "@/zustand/useMusicStore";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar, Edit, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface SongsTableProps {
  onClickUpdateSong: (song: Song) => void;
}

const SongsTable = ({ onClickUpdateSong }: SongsTableProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { setAlertOption } = useAlert();
  const songs = useMusicStore((state) => state.songs);

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: deleteSong } = useDeleteSong(deleteSongSuccess);

  const deleteSongHandler = (id: string) => {
    setIsLoading(true);
    deleteSong(id);
  };

  const deleteSongConfirmation = (id: string) => {
    setAlertOption({
      open: true,
      title: "Delete Song",
      description: "Are you sure you want to delete this song?",
      onOk: () => {
        deleteSongHandler(id);
      },
    });
  };

  function deleteSongSuccess() {
    queryClient.invalidateQueries({ queryKey: [SONG_API_PORTOCAL().BASE_URL] });
    queryClient.invalidateQueries({
      queryKey: [STATS_API_PORTOCAL().BASE_URL],
    });
    toast.success("Song deleted successfully");
    setIsLoading(false);
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>{t("SONG.TITLE")}</TableHead>
          <TableHead>{t("SONG.ARTIST")}</TableHead>
          <TableHead>{t("SONG.RELEASE_DATE")}</TableHead>
          <TableHead className="text-right">{t("SYSTEM.ACTIONS")}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          <TableRow>
            <Loading />
          </TableRow>
        ) : (
          songs.map((song) => (
            <TableRow
              key={song._id}
              className="hover:bg-zinc-800/50 cursor-pointer"
            >
              <TableCell className="font-medium">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="size-10 rounded object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="size-4" />
                  {song.createdAt.split("T")[0]}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => deleteSongConfirmation(song._id)}
                  >
                    <Trash className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onClickUpdateSong(song)}
                  >
                    <Edit className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default SongsTable;
