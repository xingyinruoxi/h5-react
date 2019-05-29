import React from 'react';
import './style.css';
import PT from 'prop-types';
import {withRouter} from 'react-router';

function NavBar(props) {
    let {backState, title, history,bgWhite,noNavBar} = props;
    return (
        <section>
            {
                noNavBar===true?'':(
                    <header className="bar bar-nav">
                        {
                            backState === false ? null : ( <a className={"back"} href={''}
                                     onClick={(ev) => {
                                         ev.stopPropagation();
                                         ev.preventDefault();
                                         history.goBack();
                                     }}
                            >
                                &nbsp;
                            </a>)
                        }
                        <h1>{title}</h1>
                    </header>

                )
            }
            <div className={`content${bgWhite?' bg-white':''}`} id={'content'}>
                {props.children}
            </div>
        </section>

    )
}

NavBar.propTypes = {
    backState: PT.bool
};
export default withRouter(NavBar);