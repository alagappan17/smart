export const textStyles = {
  title: {
    fontWeight: 300,
    marginBottom: 2,
    textAlign: 'center',
  },
  tableHeader: {
    fontSize: '1.1rem',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'black',
  },
};
export const modalStyles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '50%',
    width: '50%',
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 12,
    borderRadius: 10,
    p: 4,
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
};

export const formStyles = {
  formInputField: {
    width: '100%',
  },
  customButton: {
    width: '100%',
  },
  formContainer: {
    width: '100%',
    height: 325,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
    gap: 3,
  },
  loaderBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenText: {
    color: 'green',
    fontSize: '12px',
    marginTop: '2px',
    marginLeft: '10px',
  },
  redText: {
    color: 'red',
    fontSize: '12px',
    marginTop: '2px',
    marginLeft: '10px',
  },
};

export const blockStyles = {
  blocksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    textAlign: 'left',
    height: '74vh',
    overflowY: 'auto',
  },
  block: {
    border: '1px solid black',
    padding: 2,
    borderRadius: 4,
  },
  iconButton: { borderRadius: 3, cursor: 'pointer', backgroundColor: 'white' },
};
