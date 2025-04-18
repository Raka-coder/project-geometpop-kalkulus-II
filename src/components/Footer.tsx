import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

function Footer() {
  return (
    <footer className="w-full " id="footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <Link to="" className="flex justify-center lg:justify-start text-dark-blue font-bold text-4xl">
              GeometPop
            </Link>
            <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">Trusted in more than 100 countries & 5 million customers. Have any query ?</p>
            <Button asChild className="bg-custom-yellow text-dark-blue hover:bg-custom-yellow/90 text-base">
                <Link to="/">
                  Lihat Panduan
                  <ArrowRight className="ml-2" size={16}/>
                </Link>
              </Button>
          </div>

          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-gray-900 font-medium mb-7">GeometPop</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6"><a href="javascript:;" className="text-gray-600 hover:text-gray-900">Home</a></li>
              <li className="mb-6"><a href="javascript:;" className=" text-gray-600 hover:text-gray-900">About</a></li>
              <li className="mb-6"><a href="javascript:;" className=" text-gray-600 hover:text-gray-900">Pricing</a></li>
              <li><a href="javascript:;" className=" text-gray-600 hover:text-gray-900">Features</a></li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-gray-900 font-medium mb-7">GeometPop</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6"><a href="javascript:;" className="text-gray-600 hover:text-gray-900">Home</a></li>
              <li className="mb-6"><a href="javascript:;" className=" text-gray-600 hover:text-gray-900">About</a></li>
              <li className="mb-6"><a href="javascript:;" className=" text-gray-600 hover:text-gray-900">Pricing</a></li>
              <li><a href="javascript:;" className=" text-gray-600 hover:text-gray-900">Features</a></li>
            </ul>
          </div>
        </div>

        <div className="py-7 border-t border-gray-200 items-center">
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-500 ">©<a href="">geometpop</a> 2025, All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
