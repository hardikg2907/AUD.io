import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { motion } from 'framer-motion'
import 'react-vertical-timeline-component/style.min.css'
import SectionWrapper from '../../hoc/SectionWrapper'
import { textVariant } from '../../utils/motion'
import { BsRocketTakeoff, BsUpload, BsShare, BsMusicNoteBeamed, BsHeadphones, BsArrowsExpand } from 'react-icons/bs'
import { AiOutlineEdit, AiOutlineExport, AiOutlineSearch, AiOutlineHome } from 'react-icons/ai'
import { FaRegHandshake } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

const ExperienceCard = ({ item, index }) => {
    return (
        <VerticalTimelineElement
            contentStyle={{ background: '#1d1836', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #231631' }}
            //   date={index}
            iconStyle={{ background: '#E3DDD3' }}
            icon={
                <div className='flex items-center h-[55%] text-purple-800 scale-125'>
                    {/* <p className='text-3xl'>{index}</p> */}
                    {item.icon}
                </div>
            }
        >
            <h3 className='text-white text-[24px] font-bold'>{item.title}</h3>
            <p>{item.content}</p>
        </VerticalTimelineElement>
    )
}

const AppFlow = () => {

    const flow = [
        {
            title: 'Get Started',
            content: 'Sign up or log in to your AUD.io account to access a world of music creation and collaboration.',
            icon: <BsRocketTakeoff />,
        },
        {
            title: 'Upload Your Tracks',
            content: 'Start by uploading your music compositions. Simply drag and drop your audio files into our user-friendly interface.',
            icon: <BsUpload />,
        },
        {
            title: 'Edit Your Music',
            content: 'Use our powerful editing tools to fine-tune your tracks. Mix, add effects, adjust volumes, and more to achieve your desired sound.',
            icon: <AiOutlineEdit />,
        },
        {
            title: 'Export Your Music',
            content: "When you're satisfied with your edits, export your tracks in your preferred format, whether it's MP3, WAV, or others.",
            icon: <AiOutlineExport />,
        },
        {
            title: 'Share Your Music with the World',
            content: 'Publish your tracks directly to streaming platforms or share them on your social media profiles to reach a wider audience.',
            icon: <BsShare />,
        },
        {
            title: 'Explore Remixes',
            content: 'Discover remixes and reimaginations of your favorite tracks by other talented artists in our community.',
            icon: <AiOutlineSearch />,
        },
        {
            title: 'Remix and Collaborate',
            content: 'Get creative by remixing tracks from other users. Collaborate with fellow musicians to create unique and exciting compositions.',
            icon: <FaRegHandshake />,
        },
        {
            title: 'Listen and Share',
            content: 'Listen to your own tracks, remixes, and those of others directly on the platform. Share your favorite tunes with your network.',
            icon: <BsHeadphones />,
        },
        {
            title: 'Expand Your Sound Library',
            content: 'Access an extensive library of loops, samples, and virtual instruments to expand your creativity.',
            icon: <BsMusicNoteBeamed />,
        },
        {
            title: 'Manage Your Profile',
            content: 'Keep your profile updated with your latest music, collaborations, and remixes. Showcase your musical journey to the community.',
            icon: <CgProfile />,
        },
        {
            title: 'Join Our Community',
            content: 'Connect with fellow musicians, seek support, and share your knowledge in our vibrant music creation community.',
            icon: <AiOutlineHome />,
        },
    ]

    return (
        <div className='mt-5 flex flex-col'>
            <VerticalTimeline>
                {flow.map((item, index) => (
                    <ExperienceCard key={index} item={item} index={index + 1} />
                ))}
            </VerticalTimeline>
        </div>

    )
}

export default SectionWrapper(AppFlow, "")