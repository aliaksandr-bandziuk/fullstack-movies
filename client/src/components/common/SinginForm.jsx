import React, { useState } from 'react'
import { LoadingButton } from "@mui/lab"
import { Alert, Box, Button, Stack, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify"
import * as Yup from "yup"

import userApi from "../../api/modules/user.api"
import { setAuthModalOpen } from '../../redux/features/authModalSlice'
import { setUser } from "../../redux/features/userSlice"

const SinginForm = ({ switchAuthState }) => {
  const dispatch = useDispatch()

  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const singinForm = useFormik({
    initialValues: {
      password: "",
      username: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, "username must contain minimum 6 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password must contain minimum 8 characters")
        .required("password is required"),
    }),
    onSubmit: async values => {
      setErrorMessage(undefined)
      setIsLoginRequest(true)
      const { response, err } = await userApi.singin(values)
      setIsLoginRequest(false)

      if (response) {
        singinForm.resetForm()
        dispatch(setUser(response))
        dispatch(setAuthModalOpen(false))
        toast.success("Sing in success")
      }

      if (err) setErrorMessage(err.message)
    }
  })

  return (
    <Box component="form" onSubmit={singinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField 
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={singinForm.values.username}
          onChange={singinForm.handleChange}
          color="success"
          error={singinForm.touched.username && singinForm.errors.username !== undefined}
          helperText={singinForm.touched.username && singinForm.errors.username}
        />
        <TextField 
          type = "password"
          placeholder="password"
          name = "password"
          fullWidth
          value={singinForm.values.password}
          onChange={singinForm.handleChange}
          color="success"
          error = {singinForm.touched.password && singinForm.errors.password !== undefined}
          helperText={singinForm.touched.password && singinForm.errors.password}
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}

      >
        sing in
      </LoadingButton>

      <Button
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => switchAuthState()}
      >
        sing up
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity='error' variant='outline'>{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  )
}

export default SinginForm