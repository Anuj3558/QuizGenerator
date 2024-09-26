import { motion } from 'framer-motion'
import { Button } from "./ui/Button"
import { Link } from 'react-router-dom';

function Nav() {
    return (
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-16"
      >
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          AIQuizGen
        </div>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-gray-300 hover:text-white">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
          </Link>
        </div>
      </motion.nav>
    )
}

export default Nav;
