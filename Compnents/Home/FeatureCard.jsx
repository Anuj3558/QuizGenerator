
import { motion} from 'framer-motion'

import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"

function FeatureCard({ icon, title, description }) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-4">
              {icon}
              <span className="text-xl font-semibold">{title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">{description}</p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }
export default FeatureCard;
  