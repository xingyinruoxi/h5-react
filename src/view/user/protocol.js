import React from 'react';
import './../../common/css/protocol.css'
import NavBar from './../../components/NavBar/NavBar';

export default function () {
    return (
        <NavBar title={'用户协议'}>
            <div className="article">
                <h4 className="title">注册服务协议</h4>
                <p style={{'paddingTop':'8px','paddingBottom': '8px'}}>
                    欢迎您使用锦绣盛唐的服务！
                </p>
                <p>
                    为使用锦绣盛唐的服务，您应当阅读并遵守本《注册服务协议》（以下简称“本协议”）。本协议是用户与锦绣盛唐之间的法律协议，是用户注册锦绣盛唐账号并使用锦绣盛唐的平台服务或非经注册程序直接使用锦绣盛唐平台服务时的通用条款。请您务必审慎阅读、充分理解本协议各条款内容，特别是免除或者限制责任的条款、管辖与法律适用条款。限制、免责条款将以黑体加粗或加下划线的形式提示您重点注意。除非您已阅读并接受本协议所有条款，否则您无权使用锦绣盛唐提供的服务。您使用锦绣盛唐的服务即视为您已阅读并同意本协议的约束。
                </p>
                <h5>一、定义</h5>
                <ul>
                    <li>1.1 锦绣盛唐平台，由浙江锦绣盛唐科技有限公司设立并运营，包含锦绣盛唐移动应用软件（APP）。</li>
                    <li>1.2
                        用户，包含注册用户和非注册用户，以下亦称为“您”。注册用户是指通过锦绣盛唐平台完成全部注册程序后，使用锦绣盛唐平台服务或锦绣盛唐平台资料的用户。非注册用户是指未进行注册、直接登录锦绣盛唐平台或通过其他锦绣盛唐平台允许的方式进入锦绣盛唐平台直接或间接地使用锦绣盛唐平台服务或锦绣盛唐平台资料的用户。
                    </li>
                    <li>1.3 协议方，本协议中协议双方合称“协议方”。浙江锦绣盛唐科技有限公司及其相关服务可能存在的运营关联单位、锦绣盛唐平台在协议中统称为"锦绣盛唐"。</li>
                </ul>
                <h5>二、服务内容</h5>
                <ul>
                    <li>2.1
                        服务的具体内容由锦绣盛唐实际提供，包括但不限于展示绣花机信息、在线选择绣花机、在线购买、售后维修、配件服务、签署电子合同、代收代付款、为与锦绣盛唐合作的第三方金融机构提供跳转链接等（以下统称“服务”）。
                    </li>
                    <li>2.2 服务仅供个人用户使用。非经锦绣盛唐书面同意，您或其他用户均不得将服务的任何信息用于商业及其他一切经济目的。</li>
                    <li>2.3 您使用服务时所需的相关设备以及网络资源等（如个人电脑及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费）均由您自行负担。</li>
                    <li>2.4 如您使用锦绣盛唐服务，应在锦绣盛唐平台注册，锦绣盛唐负责对您提交
                        的相关资料进行审核，待审核通过后，您方能使用锦绣盛唐的相关服务。作为锦绣盛唐的用户，您在此承诺如下：
                        <ul>
                            <li>
                                2.4.1作为本平台用户，您必须是中国大陆公民、年龄在18周岁以上且具有完全的民事权利能力及民事行为能力或依据中华人民共和国相关规定依法成立的法人主体。如不具备上述资格，您应立即停止在本网站的注册程序、停止使用本网站服务，本网站有权随时终止您的注册进程及本网站服务，您应对您做出的注册行为给本网站带来的损失承担全额赔偿责任，且您的监护人（如您为限制民事行为能力的自然人）或您的实际控制人（如您为实体）应承担连带责任。
                            </li>
                            <li>
                                2.4.2在注册时和使用本网站服务的所有期间，您应提供自身的真实资料和信息，并保证自您注册之时起至使用本网站服务的所有期间，所提交的所有资料和信息（包括但不限于电子邮件地址、联系电话、联系地址、邮政编码、个人身份信息、征信信息等）真实、准确、完整，且是最新的；没有任何引人误解或者虚假的陈述，且保证锦绣盛唐可以通过您所填写的联系方式与您取得联系。
                            </li>
                            <li>2.4.3您应根据锦绣盛唐对于相关服务的要求及时提供相应的身份证明等资料，否则锦绣盛唐有权拒绝向您提供相关服务。</li>
                            <li>2.4.4您承诺将及时更新您的信息以维持该等信息的有效性。</li>
                            <li>2.4.5如果您提供的资料或信息包含有不正确、不真实的信息，锦绣盛唐保留取消您平台资格并随时结束为您提供服务的权利。</li>
                        </ul>
                    </li>
                    <li>2.5 如您申请了锦绣盛唐合作的第三方金融机构提供的金融产品，请您确认并知悉，该产品及相关服务由该第三方提供，并承担相应责任，与锦绣盛唐无关。</li>
                    <li><strong>2.6
                        您知悉并同意：当您在锦绣盛唐产生任何违约行为时，锦绣盛唐有权要求您支付应付款项（包括但不限于货款、违约金、赔偿金以及为实现上述权利锦绣盛唐支付的相关律师费、诉讼费、公证费等）。</strong>
                    </li>
                </ul>
                <h5>三、信息提供和隐私保护</h5>
                <ul>
                    <li>3.1
                        您在访问、使用锦绣盛唐平台或申请使用服务时，必须提供本人真实的个人信息，且您应该根据实际变动情况及时更新和完善个人信息，以便于您更好地接受锦绣盛唐提供的服务。同时，保护用户隐私也是锦绣盛唐的重要原则，锦绣盛唐会通过各种技术手段和强化内部管理等办法提供隐私保护服务功能，充分保护您的个人信息安全。
                    </li>
                    <li>3.2 本平台不负责审核您提供的个人信息的真实性、准确性或完整性，因信息不真实、不准确或不完整而引起的任何问题及其后果，由您自行承担，且您应保证本平台免受由此而产生的任何损害或责任。</li>
                    <li>3.3
                        您理解，为申请获得服务，您应向锦绣盛唐提供您的个人信息。为向您提供服务之目的，锦绣盛唐须向有必要的第三方透露您的个人信息。您特此向锦绣盛唐授权，为向您提供服务之目的，锦绣盛唐有权使用您的个人信息、您申请服务时提供相关信息和（或）您在使用服务时储存在本平台的非公开内容（以下简称“个人资料”）。锦绣盛唐保证在除为向您提供服务之目的外，不对外公开或向其他非必要第三方提供您的个人资料，但下列情况除外：
                        <ul>
                            <li>3.3.1 事先获得您的明确授权；</li>
                            <li>3.3.2 按照相关司法机构或政府主管部门的要求；</li>
                            <li>3.3.3 为维护本平台合法权益之目的；</li>
                            <li>3.3.4 为维护社会公共利益；</li>
                            <li>3.3.5
                                为了配合政府或法律的合法要求、传票或指令等，为了保护本平台的系统和用户，或者为了确保服务和系统的完整与操作，锦绣盛唐可获取和披露其认为必要或恰当的任何信息，包括但不限于用户的个人信息、IP地址和流量信息、使用历史以及发布内容；
                            </li>
                            <li>3.3.6 法律法规或服务要求的其他合法情形。</li>
                        </ul>
                    </li>
                </ul>
                <h5>四、使用准则</h5>
                <ul>
                    <li>4.1 您在使用锦绣盛唐提供的服务过程中，必须遵循国家的相关法律法规，符合锦绣盛唐关于使用服务相关的合法合理要求。</li>
                    <li>4.2 用户不得利用锦绣盛唐的服务从事下列危害计算机信息网络安全的活动：
                        <ul>
                            <li>4.2.1 未经允许，进入计算机信息网络或者使用计算机信息网络资源；</li>
                            <li>4.2.2 未经允许，对计算机信息网络功能进行删除、修改或者增加；</li>
                            <li>4.2.3 未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加；</li>
                            <li>4.2.4 故意制作、传播计算机病毒等破坏性程序；</li>
                            <li>4.2.5 其他危害计算机信息网络安全的行为。</li>
                        </ul>
                    </li>
                    <li>4.3 您须对自己在使用服务过程中的行为承担法律责任。</li>
                    <li>4.4 如您的操作影响系统总体稳定性或完整性，锦绣盛唐将暂停或终止您的操作，直到相关问题得到解决。</li>
                </ul>
                <h5>五、免责声明</h5>
                <ul>
                    <li>5.1
                        您应妥善保管您的手机设备（含手机号码）、锦绣盛唐账号及密码等信息，不得向任何人泄露借款人以上信息。对于因账号、密码泄露所导致的损失，由您自行承担。如您发现有他人冒用或盗用借款人的账号及密码申请本服务，应立即以有效方式通知锦绣盛唐，要求锦绣盛唐暂停本服务。同时，您理解锦绣盛唐对您的请求采取行动需要合理期限，在锦绣盛唐收到通知并暂停服务之前，锦绣盛唐对已执行的指令及(或)所导致的您的损失不承担任何责任。
                    </li>
                    <li>5.2
                        若您尚不具备完全民事行为能力，但因您提供非真实、不完整、不准确、非法或者无效的资料，使锦绣盛唐误认为您是完全民事行为能力人而受理您的服务申请的，则由您及您的监护人承担因此产生的一切法律后果及责任，并且赔偿锦绣盛唐因此招致的损失；锦绣盛唐不承担任何责任。
                    </li>
                    <li>5.3 如因您个人原因（包括但不限于未能提供全部资料等）导致的您未能成功获得锦绣盛唐合作的第三方金融机构提供的产品，锦绣盛唐不承担责任。</li>
                    <li><strong>5.4
                        锦绣盛唐负责向您提供锦绣盛唐平台服务。但锦绣盛唐对锦绣盛唐平台服务不作任何明示或暗示的保证，包括但不限于锦绣盛唐平台服务的适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。同时，锦绣盛唐也不对锦绣盛唐平台服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、稳定性、完整性和及时性作出任何承诺和保证。</strong>
                    </li>
                    <li>5.5
                        对黑客行为、计算机病毒、或因您保管疏忽致使账号、密码被他人非法使用、盗用、篡改的或丢失，或由于与本平台链接的其它平台所造成您个人资料的泄露，锦绣盛唐不承担责任。如您发现任何非法使用用户帐号或安全漏洞的情况，请立即与锦绣盛唐联系。
                    </li>
                    <li>
                        <strong>5.6 您了解并同意，锦绣盛唐不对因下述任一情况而导致您的任何损害赔偿承担责任，包括但不限于利润、商誉、使用、数据等方面的损失或其它无形损失的损害赔偿：</strong>
                        <ul>
                            <li><strong>5.6.1 使用或未能使用锦绣盛唐平台服务；</strong></li>
                            <li><strong>5.6.2 第三方未经批准地使用您的账户或更改您的数据；</strong></li>
                            <li><strong>5.6.3
                                通过锦绣盛唐平台购买、获取任何服务、数据、信息等行为或替代行为或与其他任何第三方搭建线上/线下交易、服务法律关系之间的全部事宜产生的费用及损失；</strong></li>
                            <li><strong>5.6.4 您对锦绣盛唐平台服务的误解；</strong></li>
                            <li><strong>5.6.5 任何非因锦绣盛唐的原因而引起的与锦绣盛唐平台服务有关的其它损失。</strong></li>
                        </ul>
                    </li>
                    <li>5.7 因任何非本平台原因造成的网络服务中断或其他缺陷，锦绣盛唐不承担任何责任。</li>
                    <li>5.8 锦绣盛唐不保证服务一定能满足您的要求；不保证服务不会中断，也不保证服务的及时性、安全性、准确性。</li>
                    <li>5.9
                        任何情况下，因使用本平台而引起或与使用本平台有关的而产生的由锦绣盛唐负担的责任赔偿总额，无论是基于合同、保证、侵权、产品责任、严格责任或其它理论，均不得超过您因访问或使用本平台而向本平台支付的任何报酬（如有）。
                    </li>
                </ul>
                <h5>六、服务变更、中断或终止</h5>
                <ul>
                    <li>6.1 如因升级的需要而需暂停网络服务、或调整服务内容，锦绣盛唐将尽可能在本平台上进行通告。由于用户未能及时浏览通告而造成的损失，锦绣盛唐不承担任何责任。</li>
                    <li>6.2
                        您明确同意，锦绣盛唐有权根据实际情况随时调整本平台提供的服务内容、种类和形式，或自行决定授权第三方向您提供原本锦绣盛唐提供的服务。因业务调整给您或其他用户造成的损失，锦绣盛唐不承担任何责任。同时，锦绣盛唐保留随时变更、中断或终止服务全部或部分服务的权利。
                    </li>
                    <li>6.3 发生下列任何一种情形，锦绣盛唐有权单方面中断或终止向您提供服务而无需通知您，且无需对您或第三方承担任何责任：
                        <ul>
                            <li>6.3.1. 您提供的个人资料不真实；</li>
                            <li>6.3.2. 您违反本服务条款及其他平台内规定；</li>
                            <li>6.3.3. 未经锦绣盛唐书面同意，将本平台用于商业及其他任何经济目的。</li>
                        </ul>
                    </li>
                    <li>6.4 您可以随时通知锦绣盛唐终止向您提供服务或直接取消服务。自您终止或取消服务之日起，锦绣盛唐不再向您承担任何形式的责任。</li>
                </ul>
                <h5>七、知识产权及其它权利</h5>
                <ul>
                    <li>7.1 锦绣盛唐平台内容均由锦绣盛唐发布，应取得相关授权的已经取得授权。</li>
                    <li>7.2
                        未经锦绣盛唐的事先书面同意，您不得擅自复制、传播在本平台上的该等内容，或将其用于任何商业目的，所有这些资料或资料的任何部分仅可作为个人或非商业用途而保存在某台计算机内。否则，锦绣盛唐将追究您的法律责任。
                    </li>
                </ul>
                <h5>八、特别约定</h5>
                <ul>
                    <li><strong>8.1
                        若您利用服务从事任何违法或侵权行为，由您自行承担全部责任，因此给锦绣盛唐或任何第三方造成任何损失，您应负责全部赔偿责任，并使锦绣盛唐免受由此产生的任何损害。</strong></li>
                    <li>8.2 您同意锦绣盛唐通过重要页面的公告、通告、电子邮件以及常规信件的形式向您传送与服务有关的任何通知和通告。</li>
                    <li>8.3 本服务条款之效力、解释、执行均适用中华人民共和国法律。</li>
                    <li><strong>8.4 如就本协议内容或其执行发生任何争议，应尽量友好协商解决；协商不成时，任何一方均可向北京市海淀区人民法院提起诉讼。</strong></li>
                    <li>8.5 本服务条款中的标题仅为方便而设，不影响对于条款本身的解释。</li>
                </ul>
            </div>
        </NavBar>
    )
}