import React, { useEffect, useState } from 'react'
import { Box, Modal } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import { setAuthModalOpen } from "../../redux/features/authModalSlice"
import Logo from "./Logo"

const actionState = {
  singin: "singin",
  singup: "singup"
}

const AuthModal = () => {

  const { authModalOpen } = useSelector((state) => state.authModal)

  const dispatch = useDispatch()

  const [action, setAction] = useState(actionState.singin)

  useEffect(() => {
    if (authModalOpen) setAction(actionState.singin)


  }, [authModalOpen])

  const handleClose = () => dispatch(setAuthModalOpen(false))

  const switchAuthState = (state) => setAction(false)

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "600px",
        padding: 4,
        outline: "none"
      }}>
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper" }}>
          <Box sx={{ texAlign: "center", marginBottom: "2rem"}}>
            <Logo />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default AuthModal