const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  table: {
    marginTop: theme.spacing.unit * 3,
    border: '1px solid #454545',
    width: '100%',
    borderCollapse: 'collapse'
  },
  cell: {
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  status: {
    textAlign: 'right'
  },
  decline: {
    backgroundColor: '#ddaaaa',
    marginLeft: theme.spacing.unit
  },
  approve: {
    backgroundColor: '#aaddaa'
  },
  declined: {
    backgroundColor: '#ddaaaa'
  },
  approved: {
    backgroundColor: '#aaddaa'
  }
});

export default styles;
