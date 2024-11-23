import Link from "next/link"
import { sidebar, buttons } from "@/styles/SideBar.module.css"
const SideBar = () => {
    // return (
    //     <div className={ sidebar }>
    //         <Link href="/TodoPage">
    //             <button type="button" className={`btn btn-outline-primary ${buttons}`}>My Todo List</button>
    //         </Link>

    //         <Link href="">
    //             <button type="button" className={`btn btn-outline-primary ${buttons}`}>My Groups</button>
    //         </Link>
    //     </div>
    // )
    return(
        <div className={ sidebar }>
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        My TodoList
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <Link href="/TodoPage">
                            <button type="button" className={`btn btn-outline-primary ${buttons}`}>My Todo List</button>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
            
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        My Groups
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <Link href="/TodoPage">
                            <button type="button" className={`btn btn-outline-primary ${buttons}`}>My Group 1</button>
                        </Link>
                        <Link href="/TodoPage">
                            <button type="button" className={`btn btn-outline-primary ${buttons}`}>My Group 2</button>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default SideBar