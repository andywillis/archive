const styles = theme => ({
  link: {
    fontSize: theme.spacing.unit * 2.5,
    textTransform: 'uppercase',
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    display: 'inline-block'
  },
  anchor: {
    textDecoration: 'none',
    '&:hover': {
      color: 'red'
    }
  }
});

export default styles;
