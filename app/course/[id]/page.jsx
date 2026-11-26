import {notFound} from "next/navigation";
import {courseById} from "../../../lib/courses.mjs";
import Player from "./player";
export default async function Course({params}){const {id}=await params;const course=courseById(id);if(!course)notFound();return <Player course={course}/>;}