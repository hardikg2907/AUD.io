import { motion } from 'framer-motion'
import SectionWrapper from '../../hoc/SectionWrapper'
import { slideIn } from '../../utils/motion'

const EditAudio = () => {

    return (
        <div className="w-full flex justify-center items-center">
            <motion.div variants={slideIn("left", "tween", 0.3, 1)} className="text-white p-5 w-1/2">
                <h1 className="text-3xl font-bold">Audio editing made easy</h1>
                <p>Editing audio should not be difficult. It should be simple to trim, cut, and edit audio files no matter what file types they are. With AUD.io's online audio editor, it is that simple.<br /><br />This audio editor equips you with modern, easy-to-use tools to remove background noise, access countless audio effects, and even turn your audio files into visual waveforms. Never feel overwhelmed with editing audio again.</p>
            </motion.div>
            <motion.div variants={slideIn("right", "tween", 0.3, 1)} className='w-1/2'>
                <img src="https://images.unsplash.com/photo-1614149162883-504ce4d13909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWMlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" className="rounded-3xl scale-[0.8]" />
            </motion.div>
        </div>
    )
}

export default SectionWrapper(EditAudio, "")