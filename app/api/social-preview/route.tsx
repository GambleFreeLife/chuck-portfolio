import { ImageResponse } from "next/og";
export const runtime = "nodejs";
export function GET() {
  return new ImageResponse(<div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", background:"#f4f6f1", color:"#20322e", padding:"58px 70px", fontFamily:"sans-serif" }}>
    <div style={{display:"flex", justifyContent:"space-between", fontSize:24}}><span style={{fontWeight:700}}>chuck baryames.</span><span style={{fontSize:18,color:"#426458"}}>WEBSITES + MARKETING · MICHIGAN</span></div>
    <div style={{display:"flex",flexDirection:"column", marginTop:53, fontSize:66, fontWeight:700,letterSpacing:-3,lineHeight:1.08}}><span>Make it easier for your</span><span>next customer to choose you.</span></div>
    <div style={{display:"flex",marginTop:27,fontSize:25,color:"#4d6058"}}>Websites. Google Ads. Email. Short video.</div>
    <div style={{display:"flex",marginTop:"auto",alignItems:"center",justifyContent:"space-between",borderTop:"1px solid #c7d3c9",paddingTop:25}}><span style={{display:"flex",background:"#203b30",color:"white",padding:"17px 24px",fontSize:23,borderRadius:5}}>Get 3 free fixes for your website</span><span style={{fontSize:22}}>Websites from $750</span></div>
    <div style={{display:"flex",marginTop:18,fontSize:18,color:"#4d6058"}}>chuckbaryames.com</div>
  </div>, {width:1200,height:630});
}
