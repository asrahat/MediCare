"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { 
  FaHeart,     
  FaBrain,       
  FaBone,           
  FaBaby,            
  FaHandSparkles     
} from "react-icons/fa6";


const specializations = [
  {
    title: "Cardiology",
    description: "Expert care for heart health, cardiovascular systems, and blood pressure regulation management.",
    icon: FaHeart,
    color: "from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/30"
  },
  {
    title: "Neurology",
    description: "Advanced diagnostics for the central nervous system, brain function, and complex spinal health.",
    icon: FaBrain,
    color: "from-indigo-500/10 to-blue-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/30"
  },
  {
    title: "Orthopedics",
    description: "Comprehensive treatment for bone injuries, skeletal structures, joints, and muscular systems.",
    icon: FaBone,
    color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30"
  },
  {
    title: "Pediatrics",
    description: "Dedicated primary healthcare, illness management, and developmental support for infants and teenagers.",
    icon: FaBaby,
    color: "from-sky-500/10 to-teal-500/10 text-sky-600 dark:text-sky-400 border-sky-200/50 dark:border-sky-900/30"
  },
  {
    title: "Dermatology",
    description: "Specialized diagnostics for systemic skin conditions, allergen barriers, and cosmetic renewal care.",
    icon: FaHandSparkles,
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/30"
  }
];

export default function MedicalSpecializations() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
    
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Explore Medical Specializations
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            Find the exact medical expertise you need. Access world-class clinical practitioners across vetted, target healthcare channels.
          </p>
        </div>

   
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {specializations.map((specialty, index) => {
            const IconComponent = specialty.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card 
                  isPressable
                  className="h-full border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:border-teal-500/30 dark:hover:border-teal-500/20 transition-all duration-300 group rounded-2xl"
                >
                  <div className="p-6 flex flex-col items-center text-center">
 
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${specialty.color} border transition-transform duration-300 group-hover:scale-110 mb-4`}>
                      <IconComponent className="text-2xl shrink-0" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-200 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      {specialty.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                      {specialty.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}