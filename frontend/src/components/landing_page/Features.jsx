import { Tilt } from "react-tilt"
import { motion } from "framer-motion"
import SectionWrapper from '../../hoc/SectionWrapper'
import { fadeIn, textVariant } from "../../utils/motion"

const ProjectCard = ({ title,content,index }) => {
    return (
        <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
            <Tilt options={{ max: 45, scale: 1, speed: 450 }} className='p-5 rounded-2xl sm:w-[360px] w-full bg-[#3c1361]'>
                <div className="">
                    <h3 className="text-white font-extrabold text-lg">{title}</h3>
                    <p className="mt-2 text-gray-300 text-base">{content}</p>
                </div>
            </Tilt>
        </motion.div>
    )
}

const Features = () => {

    const features=[
        {
            title:'Audio Mixing and Editing',
            content:'Effortlessly mix and edit your audio tracks with our intuitive interface. Adjust volume levels, cut, copy, paste, and apply fade-ins and fade-outs.',
        },
        {
            title:'Real-time Effects',
            content:'Add real-time effects to your music, such as reverb, chorus, delay, and equalization. Experiment with various custom effects.',
        },
        {
            title:'Multi-Track Support',
            content:'Work on multiple tracks simultaneously. Arrange, layer, and synchronize audio elements to create complex compositions.',
        },
        {
            title:'Collaboration Features',
            content:'Collaborate with bandmates or fellow producers in real-time. Share projects, leave comments, and work together from anywhere.',
        },
        {
            title:'Mastering Tools',
            content:'Optimize your final mix with our mastering tools. Fine-tune compression, limiters, and other parameters for a professional sound.',
        },
        {
            title:'Virtual Instruments',
            content:'Access a library of virtual instruments, including synthesizers, pianos, and drums. Craft unique melodies and rhythms.',
        },
    ]

    return (
        <div className="h-[90vh] px-5">
            <motion.div variants={textVariant()} className="text-white">
                <p className='text-center text-5xl'>Powerful Features</p>
                <h2 className='text-center'>Explore our suite of cutting-edge editing tools, including audio mixing, mastering, and effects. Take your music to the next level.</h2>
            </motion.div>
            <div className="mt-10 flex flex-wrap gap-7 items-center justify-center">
                {features.map((project, ind) => (
                    <ProjectCard key={ind} {...project} index={ind} />
                ))}
            </div>
        </div>
    )

}

export default SectionWrapper(Features, "work")