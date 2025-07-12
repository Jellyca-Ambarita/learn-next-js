'use client'

import {
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { styled, keyframes } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDarkMode } from '@/context/DarkModeContext'
import DarkModeToggle from '@/components/DarkModeToggle'
import NutritionCard from '@/components/NutritionCard'

/* ────────── helpers ────────── */
const fadeIn = keyframes`
  from {opacity:0;transform:translateY(20px)}
  to   {opacity:1;transform:translateY(0)}
`

const StyledBackground = styled('div')<{ $dark: boolean }>(({ theme, $dark }) => ({
  minHeight: '100vh',
  overflowX: 'hidden',
  background: $dark
    ? 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)'
    : 'linear-gradient(135deg,#293d5e,#5f84c7)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  position: 'relative',
}))

const PageCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(14px)',
  borderRadius: 16,
  padding: 32,
  boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
  animation: `${fadeIn} .8s ease-out`,
  width: '100%',
  maxWidth: 600,
  [theme.breakpoints.down('sm')]: { maxWidth: '95%', padding: 20 },
}))

const glow = { boxShadow: '0 0 8px 2px rgba(255,215,0,.6)' }

/* ────────── Menu with calories ────────── */
const dailyMenus = {
  Senin: {
    pagi : 'Oatmeal + kiwi & chia (≈310 kcal)',
    siang: 'Ayam kukus + sayur rebus (≈420 kcal)',
    malam: 'Sup tomat + tofu goreng (≈350 kcal)',
  },
  Selasa: {
    pagi : 'Roti gandum + selai kacang (≈360 kcal)',
    siang: 'Nasi merah + ayam teriyaki (≈500 kcal)',
    malam: 'Tumis brokoli + telur orak‑arik (≈330 kcal)',
  },
  Rabu: {
    pagi : 'Smoothie mangga + granola (≈300 kcal)',
    siang: 'Bakwan jagung + lalapan (≈450 kcal)',
    malam: 'Spaghetti gandum + saus sayur (≈480 kcal)',
  },
  Kamis: {
    pagi : 'Telur rebus + pisang (≈280 kcal)',
    siang: 'Soto ayam bening + nasi merah (≈430 kcal)',
    malam: 'Salmon bakar + salad timun (≈460 kcal)',
  },
  Jumat: {
    pagi : 'Chia pudding + alpukat (≈320 kcal)',
    siang: 'Gado‑gado + lontong (≈520 kcal)',
    malam: 'Sup jamur + telur dadar (≈340 kcal)',
  },
  Sabtu: {
    pagi : 'Greek yogurt + granola (≈310 kcal)',
    siang: 'Capcay ayam + tahu (≈440 kcal)',
    malam: 'Kari kentang + tempe panggang (≈480 kcal)',
  },
  Minggu: {
    pagi : 'French toast gandum + madu (≈370 kcal)',
    siang: 'Pepes ikan + sayur asem (≈460 kcal)',
    malam: 'Nasi uduk + tahu bacem (≈500 kcal)',
  },
}

export default function NutritionPage() {
  const router = useRouter()
  const { darkMode, toggleDarkMode } = useDarkMode()
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [todayMenu, setTodayMenu] = useState<any>(null)
  const [checking, setChecking] = useState(true)

  /* pilih menu sesuai hari */
  useEffect(() => {
  const hariList = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'] as const
  type Hari = keyof typeof dailyMenus
  const hari = hariList[new Date().getDay()] as Hari
  setTodayMenu({ hari, ...dailyMenus[hari] })
}, [])

  /* auth check */
  useEffect(() => {
    localStorage.getItem('isLoggedIn') === 'true' ? setChecking(false) : router.push('/auth/login')
  }, [router])

  if (checking) return null

  return (
    <StyledBackground $dark={darkMode}>
      {/* action bar */}
      <Box sx={{ position:'absolute', top:16, right:16, display:'flex', gap:1, flexWrap:'wrap', maxWidth:'100%' }}>
        <Link href="/dashboard">
          <IconButton sx={{ color:'#FFD700', border:'1px solid #FFD700', background:'rgba(255,255,255,0.12)', '&:hover':{ background:'rgba(255,255,255,0.18)', ...glow } }}>
            <HomeIcon fontSize="small" />
          </IconButton>
        </Link>
        <IconButton onClick={e=>setAnchorEl(e.currentTarget)} sx={{ color:'#FFD700', border:'1px solid #FFD700', background:'rgba(255,255,255,0.12)', '&:hover':{ background:'rgba(255,255,255,0.18)', ...glow } }}>
          <MenuIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={()=>setAnchorEl(null)}
          PaperProps={{
            sx:{
              background: darkMode
               ? 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)'
               : 'linear-gradient(135deg,#749BC2,#A9C4EB)',
              backdropFilter:'blur(12px)',
              border:'1px solid rgba(255,255,255,0.2)',
              color:'#FFD700',
            },
          }}
        >
          {[
            { l:'Data Diri', h:'/profile' },
            { l:'Notifikasi Kesehatan', h:'/Reminders' },
            { l:'Media Sosial', h:'/social' },
          ].map(i=>(
            <MenuItem key={i.h} onClick={()=>setAnchorEl(null)}>
              <Link href={i.h} style={{ textDecoration:'none', color:'inherit' }}>{i.l}</Link>
            </MenuItem>
          ))}
          <MenuItem onClick={()=>{ toggleDarkMode(); setAnchorEl(null) }}>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </MenuItem>
        </Menu>
      </Box>

      {/* content */}
      <PageCard>
        <Typography variant="h5" fontWeight={700} sx={{ color:'#fff' }} textAlign="center" gutterBottom>
          Menu Sehat Hari Ini
        </Typography>

        {todayMenu && (
          <>
            <Typography variant="h6" sx={{ color:'#FFD700' }} textAlign="center" gutterBottom>
              {todayMenu.hari}
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              {['Pagi','Siang','Malam'].map((slot,i)=>(
                <Grid item xs={12} sm={6} key={i} component="div">
                  <NutritionCard
                    title={slot}
                    description={(todayMenu as any)[slot.toLowerCase()]}
                    darkMode={darkMode}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </PageCard>
    </StyledBackground>
  )
}
