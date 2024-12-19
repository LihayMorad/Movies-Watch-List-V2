import { useContext } from "react";
import {
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  ExpandMoreRounded as ExpandMoreRoundedIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  RemoveRedEyeOutlined as RemoveRedEyeOutlinedIcon,
} from "@mui/icons-material";
import { FiltersContext } from "../../context/filtersContext";
import { Filters } from "../../types/Filters";

const tooltipStyles = {
  sx: { color: "white", backgroundColor: "black" },
};

const selectStyles = {
  color: "white",
  ".MuiSelect-iconOutlined": {
    color: "white",
  },
  "&, &.Mui-focused, &:hover": {
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
};

const getOrderLabel = (
  sortBy: Filters["sortBy"],
  orderBy: Filters["orderBy"]
): string => {
  const isDescending = orderBy === "descending";

  switch (sortBy) {
    case "releaseYear":
      return isDescending ? "Newest first" : "Oldest first";
    case "NameEng":
      return isDescending ? "Z - A" : "A - Z";
    case "NameHeb":
      return isDescending ? "ת - א" : "א - ת";
    case "imdbRating":
      return isDescending ? "Highest first" : "Lowest first";
    default:
      return sortBy;
  }
};

const FiltersMenu = () => {
  const { filters, updateFilters } = useContext(FiltersContext);

  const handleFilterChange = (event: any) => {
    updateFilters({ [event.target.name]: event.target.value });
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ [event.target.name]: event.target.checked });
  };

  return (
    <Grid container justifyContent="center" gap={2}>
      <Grid width="150px">
        <FormControl fullWidth>
          <InputLabel id="sortBy" sx={{ color: "white" }}>
            Sort By
          </InputLabel>
          <Select
            value={filters.sortBy}
            labelId="sortBy"
            label="Sort By"
            name="sortBy"
            onChange={handleFilterChange}
            IconComponent={ExpandMoreRoundedIcon}
            autoWidth
            sx={selectStyles}
          >
            {filters.year === "All" && (
              <MenuItem value="releaseYear">Year</MenuItem>
            )}
            <MenuItem value="NameEng">English Name</MenuItem>
            <MenuItem value="NameHeb">Hebrew Name</MenuItem>
            <MenuItem value="imdbRating">IMDB Rating</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid width="150px">
        <FormControl fullWidth>
          <InputLabel id="orderBy" sx={{ color: "white" }}>
            Order By
          </InputLabel>
          <Select
            value={filters.orderBy}
            labelId="orderBy"
            label="Order By"
            name="orderBy"
            onChange={handleFilterChange}
            IconComponent={ExpandMoreRoundedIcon}
            autoWidth
            sx={selectStyles}
          >
            <MenuItem value="descending">
              {getOrderLabel(filters.sortBy, "descending")}
            </MenuItem>
            <MenuItem value="ascending">
              {getOrderLabel(filters.sortBy, "ascending")}
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid width="100px">
        <FormControl fullWidth>
          <InputLabel id="year" sx={{ color: "white" }}>
            Year
          </InputLabel>
          <Select
            value={filters.year}
            labelId="year"
            label="Year"
            name="year"
            onChange={handleFilterChange}
            IconComponent={ExpandMoreRoundedIcon}
            autoWidth
            sx={selectStyles}
          >
            <MenuItem value="All">All</MenuItem>

            {[].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid width="95px">
        <FormControl fullWidth>
          <InputLabel id="maxResults" sx={{ color: "white" }}>
            Max Results
          </InputLabel>
          <Select
            value={filters.maxResults}
            labelId="maxResults"
            label="Max Results"
            name="maxResults"
            onChange={handleFilterChange}
            IconComponent={ExpandMoreRoundedIcon}
            autoWidth
            sx={selectStyles}
          >
            {[5, 10, 25, 50].map((value) => (
              <MenuItem value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid>
        <FormControl>
          <Tooltip
            title={
              filters.showWatchedMovies
                ? "Showing unseen movies"
                : "Showing watched movied"
            }
            slotProps={{ tooltip: tooltipStyles }}
          >
            <Checkbox
              name="showWatchedMovies"
              checked={filters.showWatchedMovies}
              onChange={handleCheckBoxChange}
              icon={
                <IconButton
                  color="primary"
                  size="medium"
                  sx={{ color: "white" }}
                >
                  <RemoveRedEyeOutlinedIcon fontSize="medium" />
                </IconButton>
              }
              checkedIcon={
                <IconButton
                  color="primary"
                  size="medium"
                  sx={{ color: "white" }}
                >
                  <RemoveRedEyeIcon fontSize="medium" />
                </IconButton>
              }
            />
          </Tooltip>
        </FormControl>
      </Grid>

      <Grid width="300px">
        <TextField
          name="search"
          label="Type movie name"
          variant="outlined"
          onChange={handleFilterChange}
          sx={{
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              color: "white",
            },
            "&, &:hover": {
              "& .MuiOutlinedInput-root.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  "&, &.Mui-focused": {
                    borderColor: "white",
                  },
                },
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default FiltersMenu;
