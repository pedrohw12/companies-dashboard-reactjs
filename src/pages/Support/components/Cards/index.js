import React from "react";

//Material ui components
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

//Styles
import { useStyles } from "./styles";

const CardComponent = ({ onClick, data }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.cardsContainer}
      container
      spacing={3}
      justify="center"
    >
      {data.map((item) => (
        <Card
          key={item.id}
          onClick={() => onClick(item)}
          className={classes.root}
          variant="outlined"
        >
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {item.title}
            </Typography>
            <Typography
              className={[classes.title, (item.response ? classes.answered : ''), (item.response ? classes.waitingAnswer : '')].join(' ')}
              color="textSecondary"
              gutterBottom
            >
              Status:&nbsp;
              {item.response ? (
                'Respondido'
              ) : (
                'Aguardando resposta'
              )}
            </Typography>
            <Typography variant="h5" component="h2">
              {item.description.length > 20
                ? item.description.substring(0, 20) + "..."
                : item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Saiba mais</Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
};

export default CardComponent;
