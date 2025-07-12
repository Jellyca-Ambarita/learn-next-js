// app/dashboard/page.tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { styled, keyframes } from '@mui/system'
import ArticleCard from '@/components/ArticleCard'
import DarkModeToggle from '@/components/DarkModeToggle'
import { useDarkMode } from '@/context/DarkModeContext'

/* ───── styled helpers ───── */
const fadeIn = keyframes`from {opacity:0;transform:translateY(16px)} to {opacity:1}`

const Background = styled(Box, {
  shouldForwardProp: p => p !== 'darkMode',
})<{ darkMode: boolean }>(({ theme, darkMode }) => ({
  minHeight: '100vh',
  background: darkMode
    ? 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)'
    : 'linear-gradient(135deg,#293d5e,#5f84c7)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
  position: 'relative',
}))

const GlassCard = styled(Container)(({ theme }) => ({
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(14px)',
  borderRadius: 24,
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(5) },
  animation: `${fadeIn} .6s ease-out`,
  textAlign: 'center',
}))

const GradientTitle = styled(Typography)({
  fontWeight: 800,
  background: 'linear-gradient(90deg,#f7971e,#ffd200)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
})

/* helper: split array */
const chunk = <T,>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  )

export default function Dashboard() {
  const { darkMode, toggleDarkMode } = useDarkMode()
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null)
  const [auth, setAuth] = useState(false)
  const [ready, setReady] = useState(false)

  const router = useRouter()
  const theme = useTheme()
  const upSm = useMediaQuery(theme.breakpoints.up('sm'))

  /* auth */
  useEffect(() => {
    setAuth(localStorage.getItem('isLoggedIn') === 'true')
    setReady(true)
  }, [])

  const logout = () => {
    localStorage.clear()
    router.replace('/')
  }

  /* fetch articles */
  useEffect(() => {
    (async () => {
      try {
        const kw = ['hidup sehat','makanan sehat','olahraga ringan','air putih','pola tidur']
        const q = kw[Math.floor(Math.random() * kw.length)]
        const res = await fetch(`https://id.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&origin=*&srlimit=9`)
        const data = await res.json()
        setArticles(data.query.search)
      } catch (err) { console.error(err) }
      setLoading(false)
    })()
  }, [])

  /* slider refs */
  const sliderRef = useRef<HTMLDivElement>(null)
  const slideWidth = () => 0.8 * (typeof window !== 'undefined' ? window.innerWidth : 320)
  const scrollSlide = (dir:'left'|'right') => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: dir==='left'? -slideWidth(): slideWidth(), behavior:'smooth' })
  }

  /* styles */
  const btnStyle = {
    bgcolor:'rgba(255,255,255,0.18)',
    color:'#ffd700',
    border:'1px solid #ffd700',
    fontSize:'0.75rem',
    px:2, py:0.6, minWidth:72,
    textTransform:'none',
    '&:hover':{ bgcolor:'rgba(255,255,255,0.25)' },
  } as const

  return (
    <Background darkMode={darkMode}>
      {/* action bar */}
      <Box sx={{ position:'absolute', top:16, right:16, display:'flex', gap:1, zIndex:10 }}>
        {ready && upSm && (auth
          ? <Button size="small" sx={btnStyle} onClick={logout}>Logout</Button>
          : <>
              <Button component={Link} href="/auth/login" size="small" sx={btnStyle}>Login</Button>
              <Button component={Link} href="/auth/daftar" size="small" sx={btnStyle}>Daftar</Button>
            </>
        )}

        <IconButton onClick={e=>setMenuEl(e.currentTarget)} sx={{ color:'#ffd700', bgcolor:'rgba(255,255,255,0.18)', border:'1px solid #ffd700' }}>
          <MenuIcon/>
        </IconButton>

        <Menu anchorEl={menuEl} open={Boolean(menuEl)} onClose={()=>setMenuEl(null)}
          PaperProps={{ sx:{ background: darkMode? '#122':'#2e4c7b', border:'1px solid rgba(255,215,0,.3)', backdropFilter:'blur(10px)' } }}
        >
          {[
            { l:'Data Diri', h:'/profile' },
            { l:'Notifikasi', h:'/Reminders' },
            { l:'Menu Sehat', h:'/Nutrition' },
            { l:'Media Sosial', h:'/social' },
          ].map(i=>(
            <MenuItem key={i.h} component={Link} href={i.h} onClick={()=>setMenuEl(null)} sx={{ color:'#ffd700', width:'100%' }}>
              {i.l}
            </MenuItem>
          ))}

          {/* auth buttons di xs: pakai array */}
          {!upSm && (auth
            ? [<MenuItem key="logout" onClick={logout} sx={{ color:'#ffd700' }}>Logout</MenuItem>]
            : [
                <MenuItem key="login" component={Link} href="/auth/login" onClick={()=>setMenuEl(null)} sx={{ color:'#ffd700' }}>Login</MenuItem>,
                <MenuItem key="daftar" component={Link} href="/auth/daftar" onClick={()=>setMenuEl(null)} sx={{ color:'#ffd700' }}>Daftar</MenuItem>,
              ])
          }

          <MenuItem onClick={()=>{ toggleDarkMode(); setMenuEl(null) }} sx={{ color:'#ffd700' }}>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
          </MenuItem>
        </Menu>
      </Box>

      {/* hero */}
      <GlassCard maxWidth="sm" sx={{ mb:{ xs:4, sm:6 }, width:'100%' }}>
        <GradientTitle variant={upSm?'h3':'h4'} gutterBottom>HealthYou</GradientTitle>
        <Typography variant="subtitle1" sx={{ color:'#eee', fontSize:{ xs:'0.9rem', sm:'1rem' } }}>
          Aplikasi Pelacak Hidup Sehat Anda
        </Typography>
      </GlassCard>

      {/* articles */}
      <GlassCard maxWidth="xl" sx={{ width:'100%', position:'relative' }}>
        <Typography variant={upSm?'h4':'h5'} gutterBottom sx={{ fontWeight:600, color:'#fff', fontSize:{ xs:'1.25rem', sm:'1.5rem', md:'1.75rem' } }}>
          Artikel & Tips Hidup Sehat
        </Typography>

        {loading ? (
          <Box sx={{ display:'flex', justifyContent:'center', my:4 }}>
            <CircularProgress sx={{ color:'#fff' }}/>
          </Box>
        ) : upSm ? (
          /* grid desktop */
          <Box sx={{ display:'grid', gridTemplateColumns:{ sm:'repeat(2,1fr)', md:'repeat(3,1fr)' }, gap:{ xs:2, sm:3, md:4 } }}>
            {articles.map(a=> <ArticleCard key={a.pageid} {...a} darkMode={darkMode}/> )}
          </Box>
        ) : (
          /* slider mobile */
          <>
            {/* arrows */}
            <IconButton onClick={()=>scrollSlide('left')} sx={{ position:'absolute', top:'50%', left:-12, transform:'translateY(-50%)', color:'#ffd700', bgcolor:'rgba(0,0,0,.25)' }}>
              <ChevronLeftIcon/>
            </IconButton>
            <IconButton onClick={()=>scrollSlide('right')} sx={{ position:'absolute', top:'50%', right:-12, transform:'translateY(-50%)', color:'#ffd700', bgcolor:'rgba(0,0,0,.25)' }}>
              <ChevronRightIcon/>
            </IconButton>

            <Box ref={sliderRef} sx={{ display:'flex', overflowX:'auto', scrollSnapType:'x mandatory', gap:2, px:1, '::-webkit-scrollbar':{ display:'none' } }}>
              {chunk(articles,4).map((group,idx)=>{
                /* pad hingga 4 elemen */
                const padded = [...group, ...Array(4-group.length).fill(null)]
                return (
                  <Box key={idx} sx={{ flex:'0 0 80vw', display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:2, scrollSnapAlign:'start', pr:1 }}>
                    {padded.map((item,i)=> item
                      ? <ArticleCard key={item.pageid} {...item} darkMode={darkMode}/>
                      : <Box key={`empty-${i}`} sx={{ visibility:'hidden', height:0 }}/>
                    )}
                  </Box>
                )
              })}
            </Box>
          </>
        )}
      </GlassCard>
    </Background>
  )
}
