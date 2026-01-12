import React from "react";
import {
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Heart,
  BookOpen,
  DollarSign,
  MessageSquare,
  Users,
  Shield,
  FileText,
  Cookie,
  ExternalLink,
} from "lucide-react";
import logo from "../assets/logo.png"; // Adjust the path to your logo image
const Footer = () => {
  return (
    <footer className="relative font-serif bg-linear-to-br from-gray-50 to-gray-100 text-gray-800 overflow-hidden">
      {/* Animated border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-300 via-purple-300 to-pink-300 animate-borderFlow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between">
          {/* Logo and Company Info */}
          <div className="flex-1 mb-8 md:mb-0">
            <div className="flex items-center space-x-4 mb-6">
              {/* Logo Image */}
              <div className="relative group">
                {/* Glow Ring */}
                <div className="absolute -inset-1 bg-linear-to-r from-blue-400 to-purple-400 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>

                {/* White Circular Container */}
                <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                  <img
                    src={logo} // Pass your image here
                    alt="Logo"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <h2 className="text-3xl font-bold py-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Streamyy
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Real-time Engagement Platform
                </p>
              </div>
            </div>

            {/* Promotion Text */}
            <div className="max-w-md">
              <p className="text-gray-600 mb-4 leading-relaxed">
                A cutting-edge platform delivering real-time audio, video, and
                interactive live streaming solutions.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Built with <Heart className="inline w-4 h-4 text-red-500" /> by Bangalorian
              </p>
              
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex-1 md:ml-12">
            <h3 className="text-xl font-semibold mb-6 text-gray-700 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" />
              Connect With Us
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-600 mb-4 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Social Media
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      icon: Twitter,
                      label: "Twitter",
                      color: "text-blue-400",
                      hover: "hover:text-blue-500",
                    },
                    {
                      icon: Github,
                      label: "GitHub",
                      color: "text-gray-700",
                      hover: "hover:text-black",
                    },
                    {
                      icon: Linkedin,
                      label: "LinkedIn",
                      color: "text-blue-600",
                      hover: "hover:text-blue-700",
                    },
                    {
                      icon: Instagram,
                      label: "Instagram",
                      color: "text-pink-500",
                      hover: "hover:text-pink-600",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      className={`flex items-center space-x-3 transition-all duration-300 ${social.hover} transform hover:translate-x-1 group`}
                    >
                      <div
                        className={`${social.color} transition-transform duration-300 group-hover:scale-110`}
                      >
                        <social.icon className="w-5 h-5" />
                      </div>
                      <span className="text-gray-600 group-hover:text-gray-900">
                        {social.label}
                      </span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-medium text-gray-600 mb-4 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Quick Links
                </h4>
                <div className="space-y-3">
                  {[
                    { icon: BookOpen, label: "Documentation" },
                    { icon: FileText, label: "API Reference" },
                    { icon: DollarSign, label: "Pricing" },
                    { icon: MessageSquare, label: "Blog" },
                    { icon: Users, label: "Support" },
                    { icon: Users, label: "Careers" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href="#"
                      className="flex items-center text-gray-600 hover:text-blue-500 transition-colors duration-300 hover:pl-2 group"
                    >
                      <link.icon className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100" />
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} ZegoCloud. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a
                href="#"
                className="hover:text-blue-500 transition-colors duration-300 flex items-center"
              >
                <Shield className="w-3 h-3 mr-1" />
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-blue-500 transition-colors duration-300 flex items-center"
              >
                <FileText className="w-3 h-3 mr-1" />
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-blue-500 transition-colors duration-300 flex items-center"
              >
                <Cookie className="w-3 h-3 mr-1" />
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

     
      <style jsx>{`
        @keyframes borderFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-borderFlow {
          background-size: 200% 200%;
          animation: borderFlow 3s ease infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;