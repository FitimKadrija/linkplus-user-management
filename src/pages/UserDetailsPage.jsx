import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Stack, Button, Divider } from "@mui/material";

export default function UserDetailsPage() {
  const { id } = useParams();
  const user = useSelector((s) =>
    s.users.items.find((u) => String(u.id) === String(id))
  );

  if (!user) {
    return (
      <Stack spacing={2}>
        <Typography>User not found.</Typography>
        <Button component={Link} to="/" variant="contained">
          Back
        </Button>
      </Stack>
    );
  }

  const addr = user.address || {};
  const addressText = [addr.street, addr.suite, addr.city, addr.zipcode]
    .filter(Boolean)
    .join(", ");

  return (
    <Stack spacing={2}>
      <Button component={Link} to="/" variant="outlined">
        ← Back
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h5" fontWeight={800}>
            {user.name}
          </Typography>
          <Typography sx={{ mt: 0.5 }}>{user.email}</Typography>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1}>
            <Typography>
              <b>Company:</b> {user.company?.name || "-"}
            </Typography>
            <Typography>
              <b>Phone:</b> {user.phone || "-"}
            </Typography>
            <Typography>
              <b>Website:</b> {user.website || "-"}
            </Typography>
            <Typography>
              <b>Address:</b> {addressText || "-"}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}