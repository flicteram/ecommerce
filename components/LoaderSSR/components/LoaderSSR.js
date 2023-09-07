import LinearProgress from '@mui/material/LinearProgress';

export default function LoaderSSR({loading}){
  if(!loading) return null
  return (
    <LinearProgress color={'inherit'} sx={{color:'rgb(214, 107, 19)',position:'fixed',top:'0',left:'0',right:'0',zIndex:'1100'}}/>
  )
}