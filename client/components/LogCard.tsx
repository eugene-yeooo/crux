/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from "react-router"
import { format } from 'date-fns'
import { Key } from "react"
import Lightbox, { Slide } from "yet-another-react-lightbox"
import Video from "yet-another-react-lightbox/plugins/video"
import "yet-another-react-lightbox/styles.css"
import { useState } from 'react'
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import { Log } from "../models/models"

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'


export default function LogCard({ log }: { log: Log }) {
  
  const [index, setIndex] = useState(-1)

  const labelStyle = 'font-semibold'

  // console.log(log.media)

  
  const formattedDate = format(new Date(log.date), 'dd MMM yyyy')

   // Map log.media to lightbox slides format
  const slides: Slide[] = (log.media || []).reduce<Slide[]>((acc, file) => {
    if (file.type === "image") {
      acc.push({ type: "image", src: file.url || "", description: file.caption || "", });
    } else if (file.type === "video") {
      acc.push({
        type: "video",
        width: 1280,
        height: 720,
        sources: [{ src: file.url || "", type: "video/mp4" }],
        preload: "auto", 
        controls: true,
        description: file.caption || "",
      });
    }
    return acc;
  }, []);
  
  return (
    <div className="rounded-lg shadow p-4 bg-white space-y-1 max-w-96">
      <Link to={`/user/${log.username}/log/${log.id}`}><h3 className="text-xl font-bold">{log.objective}{log.details.grade && <span className="font-normal text-stone-700 font-mono text-lg">&nbsp;{log.details.grade}</span>}</h3></Link>
      {log.title && <p className="text-md text-gray-800 italic">{log.title}</p>}
      <p className="font-mono tracking-tight">{log.location}</p>
      <p className="text-sm font-mono ">{formattedDate}</p>
      
       
      

      {/* Subtable-specific details */}
      {log.details && (
        <div className="text-sm text-gray-700 space-y-1 pb-2">
          {log.type === 'cave' && (
            <>
              <p><span className={labelStyle}>Team:</span> {log.details.team}</p>
            </>
          )}

          {log.type === 'climb' && (
            <>
              {/* <p><span className={labelStyle}>Grade:</span> {log.details.grade}</p> */}
              {/* <p><span className={labelStyle}>Style:</span> {log.details.style}</p>
              <p><span className={labelStyle}>Pitches:</span> {log.details.pitches}</p>
              <p><span className={labelStyle}>Height:</span> {log.details.height}</p> */}
            </>
          )}

          {log.type === 'canyon' && (
            <>
              <p><span className={labelStyle}>Grade:</span> {log.details.grade}</p>
              <p><span className={labelStyle}>Trip Companions:</span> {log.details.team}</p>
              <p><span className={labelStyle}>Flow:</span> {log.details.flow}</p>
              <p><span className={labelStyle}>Pitches:</span> {log.details.pitches}</p>
            </>
          )}

          {/* {log.type === 'alpine' && (
            <>

            </>
          )}

          {log.type === 'dive' && (
            <>
            </>
          )} */}
        </div>
      )}
      

       {/* Media files */}
      {log.media && log.media.length > 0 && (
        <>
        <div className="space-y-4 mt-4 h-auto">
          {log.media.slice(0, 2).map((file: { type: string; url: string | undefined }, i: Key | null | undefined) =>
            file.type === 'image' ? (
              <img
                key={i}
                src={file.url}
                alt={`Log media ${i + 1}`}
                className="w-full object-cover rounded cursor-pointer"
                onClick={() => setIndex(i)}
              />
            ) : file.type === 'video' ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                key={i}
                controls
                className="w-full rounded cursor-pointer"
                onClick={() => setIndex(i)}
              >
                <source src={file.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null
          )}
          </div>
          
          {/* Lightbox */}
          <Lightbox
            open={index >= 0}
            close={() => setIndex(-1)}
            slides={slides}
            plugins={[Video, Captions]}
            index={index}
            captions={{ descriptionTextAlign: "center", descriptionMaxLines: 1 }}
            styles={{
              captionsDescription: {
                fontFamily:
                  'ui-monospace, monospace',
                fontSize: "1rem",
                fontStyle: "italic",
                color: "#fff",
                marginBottom: "0.5rem",
              },
            }}
          />
      </>
      )}

    </div>
  )
}
