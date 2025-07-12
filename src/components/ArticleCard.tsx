// components/ArticleCard.tsx
'use client'

import { Card, CardContent, CardMedia, Typography } from '@mui/material'

interface Props {
  pageid: number
  title: string
  snippet: string
  darkMode: boolean
}

export default function ArticleCard({ pageid, title, snippet, darkMode }: Props) {
  const url = `https://id.wikipedia.org/?curid=${pageid}`

  return (
    <Card
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      elevation={3}
      sx={{
        height: '100%',                 // penuhi sel grid
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        bgcolor: darkMode ? '#C9CAD1' : '#C9CAD1',
        color: 'inherit',
      }}
    >
      {/* --- contoh thumbnail (opsional) --- */}
      {/* <CardMedia image="/placeholder.jpg" sx={{ height: 120 }} /> */}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          gutterBottom
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,          // max 2 baris judul
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,          // max 3 baris snippet
          }}
          dangerouslySetInnerHTML={{ __html: snippet }}
        />
      </CardContent>
    </Card>
  )
}
