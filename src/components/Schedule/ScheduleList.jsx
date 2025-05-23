import { Box, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { CheckCircle, Cancel, AccessTime, AutoDelete } from '@mui/icons-material';


export default function ScheduleList({ 
  title = "Próximos Agendamentos",
  schedules, 
  setSchedules, 
  isMobile, 
  onViewSchedule,
  isPastList = false
}) {
  return (
    <Box
      sx={{
        width: "100%",
        mt: isPastList ? 2 : 4,
        mb: 4,
        backgroundColor: isPastList ? "#DBECCF" : "#fff",
        borderRadius: "8px",
        padding: 2,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: isPastList ? "#757575" : "#2e7d32",
          borderBottom: "2px solid #e0e0e0",
          paddingBottom: 1,
        }}
      >
        {title}
      </Typography>

      <List sx={{ width: "100%" }}>
        {schedules.length > 0 ? (
          schedules.map((schedule, index) => (
            <Box key={index}>
              <ListItem>
                <Button
                  onClick={() => onViewSchedule(schedule.date)}
                  sx={{
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: isPastList ? "#eeeeee" : "#f0f7f0",
                    },
                    mb: 1,
                    opacity: isPastList ? 0.8 : 1,
                  }}
                ></Button>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="h6" sx={{ whiteSpace: "pre-line" }}>
                        {`${schedule.name} \n`}
                      </Typography>
                      <Typography
                        variant="h7"
                        sx={{ whiteSpace: "pre-line" }}
                      >{` Tipo de Material: ${schedule.type}`}</Typography>
                    </>
                  }
                  secondary={
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ whiteSpace: "pre-line", mt: 1 }}
                    >
                      {`Data: ${schedule.date}\nStatus: ${schedule.status}`}
                    </Typography>
                  }
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: "bold",
                      color: isPastList ? "#757575" : "#333",
                      textDecoration: schedule.completed
                        ? "line-through"
                        : "none",
                    },
                  }}
                />
                {schedule.status === "Coletado" ? (
                  <CheckCircle sx={{ color: "#4caf50" }} />
                ) : schedule.status === "Cancelado" ? (
                  <Cancel sx={{ color: "#f44336" }} />
                ) : schedule.status === "Confirmado" ? (
                  <AutoDelete sx={{ color: "#007bff" }} />
                ) : (
                  <AccessTime sx={{ color: "orange" }} />
                )}

              </ListItem>
              {index < schedules.length - 1 && <Divider />}
            </Box>
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "#666", py: 2 }}
          >
            {isPastList
              ? "Não há agendamentos anteriores."
              : 'Não há agendamentos futuros. Clique em "Novo Agendamento" para adicionar.'}
          </Typography>
        )}
      </List>
    </Box>
  );
}