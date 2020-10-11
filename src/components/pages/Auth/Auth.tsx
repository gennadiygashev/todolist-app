import React, { useState } from 'react'
import is from 'is_js'
import { connect } from 'react-redux'

import { auth } from '../../../store/auth/auth'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button, Paper, Snackbar } from '@material-ui/core'
import { compose, breakpoints, flexbox, sizing } from '@material-ui/system'
import styled from 'styled-components'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      height: '200vh',
      display: 'flex', 
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#3f50b5',
    },  
    rootContentSide: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexBasis: '50%',
      width: '100%',
      color: 'white'
    },
    rootFormSide: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexBasis: '50%',
    },
    formBlock: {
      padding: 60,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center' 
    },
    button: {
      width: '100%',
      marginBottom: 20,
    },
    field: {
      marginBottom: 20,
      width: '100%'
    },
    formTitle: { 
      margin: 0,
      marginBottom: 20,
      color: '#3f50b5'
    },
    contentTitle: { 
      fontSize: 40,
      marginBottom: 90,
      marginLeft: 40,
      marginRight: 40
    },
    item: {
      fontSize: 24,
    }
  }),
);

const styleFunction = breakpoints(compose(flexbox, sizing));
const Box = styled.div`
  ${styleFunction}
`; 

interface IAuth {
  auth: (email: string, password: string, isLogin: boolean) => void
  errorMessage: string
}

const Auth: React.FC<IAuth> = ({ auth, errorMessage }) => { 
  const [isFormValid, setIsFormValid] = useState<any>(false)
  const [formControlsState, setFormControlsState] = useState<any>({    
    email: {
      value: '',
      type: 'email',
      label: 'Эмейл',
      errorMessage: 'Введите корректный Эмейл',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Пароль должен быть болле 6 символов',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }  
  })

  const loginHandler = () => {
    auth(formControlsState.email.value, formControlsState.password.value, true)
  }

  const registerHandler = () => {
    auth(formControlsState.email.value, formControlsState.password.value, false)
  }

  const validateControl = (value: string, validation: any) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if(validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if(validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  const onChangeHandler = (event: any, controlName: string) => {
    const formControl = { ...formControlsState }
    const control = { ...formControl[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formControl[controlName] = control

    let isFormValid = true

    Object.keys(formControl).forEach(name => {
      isFormValid = formControl[name].valid && isFormValid
    })

    setFormControlsState(
      formControl
    )

    setIsFormValid(isFormValid)
  }

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }  

  const errorDialogMessage = () => {
    if (errorMessage === 'EMAIL_NOT_FOUND') {
      return (
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity="error">
            Аккаунта с таким Эмейлом еще не создано
          </Alert>
        </Snackbar> 
      ) 
    }
    if (errorMessage === 'INVALID_PASSWORD') {
      return (
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity="error">
            Вы ввели неверный пароль
          </Alert>
        </Snackbar> 
      ) 
    }
    if (errorMessage === 'EMAIL_EXISTS') {
      return (
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity="error">
            Аккаунт с таким Эмейлом уже зарегистрирован
          </Alert>
        </Snackbar> 
      ) 
    }
  }
 
  const renderFields = () => {
    return Object.keys(formControlsState).map((controlName, index) => {
      const control: any = formControlsState[controlName]
      return (
        <TextField 
          className={classes.field}
          key={controlName + index}
          id="outlined-basic" 
          label={control.label} 
          variant="outlined" 
          error={!control.valid && control.touched} 
          helperText={!control.valid ? control.errorMessage : ''}
          onChange={event => onChangeHandler(event, controlName)}
          type={control.type}
        />
      )
    })
  }
  
  const classes = useStyles();

  return (
    <Box 
      className={classes.root}
      md={{ flexDirection: 'row', height: '100vh' }}
    >
      <Box 
        className={classes.rootContentSide}
      >
        <h1 className={classes.contentTitle}>Решайте свои задачи с <br />Раз-Два-Три</h1>
      </Box> 
      <div className={classes.rootFormSide}> 
        <form className={classes.rootFormSide} noValidate autoComplete="off">
          <Paper className={classes.formBlock}>
            <h2 className={classes.formTitle}>Войти или загистрироваться</h2>
            { renderFields() }
            <Button 
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!isFormValid}
              onClick={loginHandler} 
              size={'large'}
            >Войти</Button>
            <Button 
              className={classes.button}
              variant="outlined" 
              color="primary"
              disabled={!isFormValid}
              onClick={registerHandler}
              size={'large'}
            >Зарегистрироваться</Button>
          </Paper>
        </form>
      </div>
      { errorDialogMessage() }
    </Box>
  );
}

const mapStateToProps = ({ auth }: any) => ({
  errorMessage: auth.errorMessage
})
 
const mapDispatchToProps = (dispatch: any) => {
  return {
    auth: (email: string, password: string, isLogin: boolean) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)