import { navigation } from '../Constants'

import { Logo } from '../assets'

function Navbar() {
  return (
    <div className='w-full h-16 bg-black flex items-center gap-10'>

        <div className='pl-2'>
            <img src={Logo} width={40} height={40}/>
        </div>

        <div>
            <ul className='flex flex-row gap-10 justify-center'> 
                {navigation.map((item, index)=>(
                    <li className='text-red-500'>
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
        
        <div className='flex items-end'>
            
        </div>
    </div>
  )
}

export default Navbar

