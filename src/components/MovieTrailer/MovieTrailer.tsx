import { FunctionComponent } from "react";
import { Dialog } from "@mui/material";

const MovieTrailer: FunctionComponent<{ open: boolean; handleClose: () => void; trailerKey?: string }> = ({
  open,
  handleClose,
  trailerKey,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="xl"
      sx={{ "& .MuiPaper-root": { backgroundColor: "#000000", borderRadius: "16px" } }}
    >
      {trailerKey ? (
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title="Movie Trailer"
          height="864px"
          style={{ border: 0 }}
        />
      ) : null}
    </Dialog>
  );
};

export default MovieTrailer;
