import { Box, Typography, Backdrop, CircularProgress, Divider } from '@mui/material'
import React from 'react'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import VideoCover from 'react-video-cover'
import BackgroundVideo from '../assets/BackgroundVideo.mp4'
import logo from '../assets/tealNoBG-cropped.png'
import useEth from '../contexts/EthContext/useEth'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import CustomButton from '../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import { grey } from '@mui/material/colors'
import '../App.css'

const Home = () => {
  const {
    state: { contract, accounts, role, loading },
    dispatch,
  } = useEth()
  const navigate = useNavigate()

  const registerDoctor = async () => {
    try {
      await contract.methods.addDoctor().send({ from: accounts[0] })
      dispatch({
        type: 'ADD_DOCTOR',
      })
    } catch (err) {
      console.error(err)
    }
  }

  const ActionSection = () => {
    if (!accounts) {
      return (
        <Typography variant='h5' color='white'>
          Open your MetaMask wallet to get connected, then refresh this page
        </Typography>
      )
    } else {
      if (role === 'unknown') {
        return (
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Box mb={2}>
              <CustomButton text='Doctor Register' handleClick={() => registerDoctor()}>
                <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
              </CustomButton>
            </Box>
            <Typography variant='h5' color='white'>
              If you are a patient, ask your doctor to register for you
            </Typography>
          </Box>
        )
      } else if (role === 'patient') {
        return (
          <CustomButton text='Patient Portal' handleClick={() => navigate('/patient')}>
            <LoginRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        )
      } else if (role === 'doctor') {
        return (
          <CustomButton text='Doctor Portal' handleClick={() => navigate('/doctor')}>
            <LoginRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        )
      }
    }
  }

  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  } else {
    return (
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        width='100vw'
        height='100vh'
        id='background'
      >
        <Box
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          
        </Box>
        <Box id='home-page-box' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={5}>
          <Typography variant='h1' color='#00bfa5' fontWeight={900} margin={'2rem'}>MediCord</Typography>
        <Typography variant='h2' color='#00bfa5' fontWeight={700}>
              Electronic health records
            </Typography>
          <Box mt={2} mb={5}>
            <Typography variant='h4' color='white'>
              Own Your Health
            </Typography>
          </Box>
          <ActionSection />
          <br />
          <br />
          <CustomButton text='Quick test' handleClick={() => navigate('/checkup')}>
            <LoginRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
          
        </Box>
      </Box>
    )
  }
}

export default Home
