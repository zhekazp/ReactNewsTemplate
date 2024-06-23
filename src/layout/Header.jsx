import NavM from "../components/top/NavM";
import TopElement from "../components/top/TopElement";
import { news } from "../util/news";

export default function Header(){
    return( <>
            <TopElement news={[news[0].title, news[1].title,
                news[2].title, news[3].title
            ]}/>
            <NavM/>
        </>
    )
}