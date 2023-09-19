import { Link } from "react-router-dom";

export function Terms() {
    return (
        <div className="container">
            <div className="row gap-4">
                <h1 className="col-12 display-6 text-center mp-3rem">Naudojimosi taisyklės ir privatumo politika.</h1>
                <p className="col-12 col-lg-10 m-auto text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, quas qui eius voluptatem fugit voluptatibus ipsam commodi dicta similique explicabo sed odio voluptate magni tenetur iusto, nemo aspernatur sapiente animi?</p>
                <p className="col-12 col-lg-10 m-auto text-left">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga harum, sit in possimus enim soluta? Minus fugit dolorem sapiente asperiores enim laboriosam esse nostrum, consequuntur repudiandae repellat dignissimos, aliquid velit odio! Delectus, distinctio consequuntur tenetur excepturi adipisci pariatur omnis harum aliquam deserunt sit molestiae consectetur molestias. Provident libero odio sint id at veniam architecto doloremque quisquam nam illum nesciunt quos blanditiis non ab similique quam maxime culpa natus, deserunt deleniti?</p>
                <p className="col-12 col-lg-10 m-auto text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolorem numquam temporibus, provident corrupti nostrum facilis fuga mollitia, fugit consequuntur tempore inventore accusamus voluptas, accusantium eos hic soluta! Quibusdam soluta vitae dolorem fugiat ex, illum eos harum nobis dolorum iste beatae incidunt. Nisi, hic adipisci? Iusto rerum voluptatem nostrum delectus vero quidem consequatur nisi ab beatae magnam laborum ratione repudiandae magni doloribus, eaque, voluptatibus nulla? Animi, natus. Illum natus quibusdam itaque aperiam dignissimos qui iure minus veniam voluptates voluptatem. Earum, odit incidunt asperiores sint fuga amet ratione assumenda nobis, aperiam, nesciunt provident numquam nostrum molestias non quaerat aliquam quia esse!</p>
                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to="/registracija" className="nav-link">Grižti i registracija</Link></li>
                </ul>
            </div>
        </div>
    )
}