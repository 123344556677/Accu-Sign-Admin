import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Col, Form, Input, Row } from 'reactstrap';
import FileBase64 from "react-file-base64";
import { addDocument } from 'Api/api';
import Swal from "sweetalert2";

const PilotModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [pagination, setPagination] = useState('one');
    return (
        <div>
            <button type="button" className="btn  pr-5 ml-4 mt-1 "
                onClick={handleShow}

                style={{
                    backgroundColor: "white",
                    color: "#adad85",
                    borderRadius: "0%"
                }}>OPEN</button>

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header px-4">
                    <h2 className="modal-title h4 text-dark text-center">Pilot Agreement</h2>
                    <button
                        type="button"
                        className="bg-white border-0 "
                        onClick={handleClose}
                    >

                    </button>
                </div>
                <Modal.Body className="px-4">
                    {
                        pagination === "one" &&

                        <p style={{ fontSize: "13px" }}>
                            THIS FLIGHT ATTENDANT AGREEMENT (hereinafter the "Agreement")
                            is deemed executed in Dubai, United Arab Emirates on 16th March 2021
                            <br /><br />
                            BETWEEN: ‘AirCrewConnect’ Matrix Aviation
                            Limited, registered at 6 Kingsmead Road, Moreton, Wirral, CH461QU, United Kingdom
                            <br /><br />
                            AND: Ouarda Mouloudi, residing at 2 Square Des
                            Tulipes, 91370, Verrieres-Le-Buisson, France (hereinafter referred to as the "Contractor")
                            <br /><br />
                            Object: AirCrewConnect wishes to retain the services of the Contractor as a flight attendant pursuant to the following terms and conditions. This Agreement will regulate the overall business relationship between AirCrewConnect and the Contractor. For each Dispatch, specific terms and conditions will be specified through an “Appendix A”, which will then form part of this Agreement. Even after signing this Agreement, the Contractor is not obliged to
                            accept any Dispatch that may be offered by AirCrewConnect during the Term.
                            <br /><br />
                            <h4> 1)	Fees, Rates, Per Diems and Expenses</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>

                                    AircrewConnect will pay Contractor for its services,
                                    fees, per diem and expenses as they will be
                                    agreed upon on a case by case basis, prior to
                                    any Dispatch, as stipulated and confirmed
                                    in e-mails containing an “Appendix “A” for such Dispatch

                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Dispatch is the service period starting
                                    the day the Contractor boards its flight to the assigned project and ends: (i) the day the Contractor’s return flight lands; or (ii) the day
                                    AirCrewConnect gives a Termination notice to the Contractor, whichever comes first.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor's fees and per diem are processed and paid automatically within 7-10 business
                                    days of the 15th and the last day of each month, based on the Contractor’s days on Dispatch.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>

                                    The Contractor's Authorized Expenses

                                    (as defined below) are processed and reimbursed
                                    within 7-10 business days of AirCrewConnect’s
                                    receipt of a duly completed AirCrewConnect
                                    Expense Report with all receipts and proof
                                    of payments required. Expense Reports must
                                    be submitted within 14 days of incurring an
                                    expense. It is understood that AirCrewConnect
                                    may decline to reimburse any expense submitted
                                    more than 14 days after they have been incurred given that
                                    AirCrewConnect may itself be precluded from seeking a reimbursement from its client after this period.

                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Authorized Expenses are reasonable expenses directly related to the performance of the Contractor’s services hereunder during Dispatch, such as, lodging accommodations, crew uniform laundry, business related ground transportation, calls, faxes and e-mails. Airfares to and from Dispatch are normally prepaid by AirCrewConnect, as per Section 2 below. Food and beverages are not considered as Authorized Expenses since they are covered by the per diem paid to the Contractor.
                                    Transport to and from Dispatch, including car parking, are at Contractor’s sole expense.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Prior to submitting its first expense report, the Contractor agrees to schedule and undergo a training session via teleconference to review AirCrewConnect policies
                                    and procedures in regard to expense submissions, unless waived by AirCrewConnect.
                                </li>
                                <br />
                            </ul>


                        </p>
                    }
                    {
                        pagination === "two" &&
                        <>


                            <h5> 2) Dispatch Conditions and Periods, and Aircraft Operational Rules</h5>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor recognizes that the execution of this Agreement does not constitute a guarantee or promise of work being offered to the Contractor.
                                    If a Dispatch is offered to Contractor, Contractor is not obliged to accept.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Notwithstanding any other provision herein, AirCrewConnect reserves all its rights to shorten, extend or otherwise modify a Dispatch period, at any time; crew Dispatch
                                    dates are approximate and may be subject to short notice modifications or cancellations.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Unless otherwise arranged and approved in writing by AirCrewConnect, for example, in the case of a family or personal emergency, the Contractor will not, under any circumstances, except in the case of a medical emergency supported in writing by a treating licensed medical practitioner, withdraw its services for a confirmed Dispatch, terminate its Dispatch, suspend its services or otherwise leave the aircraft prior to the
                                    arrival of a replacement crew and proper hand-off of the aircraft and related paperwork.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor is responsible for respecting the travel arrangements made by AirCrewConnect and will not make its own, unless otherwise agreed upon in writing by AirCrewConnect. AirCrewConnect may hold the Contractor liable for costs and
                                    expenses incurred by AirCrewConnect as a result of the Contractor missing a flight without just cause.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    If dispatched to a Client whose aircraft is not operated by AirCrewConnect, the Contractor will follow the Client’s operational standards, policies and procedures for the aircraft operations, always remaining within  established safety regulations and other operational
                                    requirements of the civil aviation authorities having jurisdiction over the aircraft.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    If dispatched to an AirCrewConnect operated aircraft:
                                    <br />
                                    <ul>
                                        <li style={{ fontSize: "11px" }}>
                                            Contractor hereby agrees and promises to follow AirCrewConnect’ Policies and
                                            Procedures for aircraft operations, as found in the AirCrewConnect aircraft manuals;
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>

                                            Contractor hereby agrees and promises to follow AirCrewConnect’ Policies and
                                            Procedures for aircraft operations, as found in the AirCrewConnect aircraft manuals;

                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            Contractor will provide AirCrewConnect with all requested documents and
                                            reports, including but not limited to documentation, aircraft logs and post flight reports.
                                        </li>
                                        <br />
                                    </ul>
                                </li>
                            </ul>





                        </>
                    }

                    {
                        pagination === "three" &&
                        <>


                            <h4> 3) Incident Reports</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    While on Dispatch or otherwise providing its services, Contractor agrees to immediately report any incident which involves them, crew mates or the aircraft and/or its passengers, whether or not the incident is the fault of the Contractor or another flight attendant, another aircraft or any other party. Such report should be a complete written explanation of the incident from the Contractor’s point of view and shall be forwarded immediately by email to AirCrewConnect’s Dubai office. Any report made and/or addressed to an
                                    AirCrewConnect client directly shall include a copy to AirCrewConnect (admin@aircrewconnect.com).
                                </li>
                                <br />

                            </ul>
                            <h4>  4) Independent Contractor/No Benefits/Income Taxes</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    This is an independent contractor Agreement for temporary professional services and the Contractor is not engaged as an employee, servant or agent of AirCrewConnect. As such, the Contractor is not entitled to the status, benefits or privileges of an AirCrewConnect employee. All amounts payable under this Agreement are inclusive of any applicable taxes of whatever nature,
                                    and neither party shall be responsible for the other party’s taxes on gross or net income.
                                </li>
                                <br />



                            </ul>
                            <h4>  5)	Liability and Indemnity/Workers Compensation Insurance</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor hereby releases from liability and agrees to defend, indemnify and hold harmless AirCrewConnect, its directors, officers, employees, agents and other contractors from and against all claims, damages, liabilities, suits and judgments, including all costs, interests and expenses relating thereto which may be suffered by, accrue against or be recoverable from AirCrewConnect, its directors, officers, employees, agents or other contractors by reason of injury to or death of the Contractor (including, if the Contractor is a corporation, any director, officer, employee or agent of the Contractor) or by reason of damage to or loss of property of the Contractor (including, if the Contractor is a corporation, any director, officer, employee or agent of the Contractor) occurring during a Dispatch
                                    or otherwise as a result of or during the provision of services by the Contractor.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Without limiting the foregoing, while actively “on-duty” during a Dispatch, the Contractor may be covered by
                                    the applicable aircraft insurance policy for the aircraft concerned by the Dispatch.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Notwithstanding the previous paragraph, the Contractor remains solely responsible to subscribe to or obtain any desired benefits including, but not limited to the following: workers’ compensation, personal accident, injury, death, temporary or permanent disability and/or other insurance; loss of license insurance; sick leave; superannuating; and like entitlements, as applicable or desirable for the Contractor. AirCrewConnect is not responsible for
                                    and will not subscribe to any of the aforementioned benefits or coverage for the Contractor.
                                </li>
                                <br />



                            </ul>
                            <h4>  6) Contractor Representations</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor represents and warrants to AirCrewConnect that the Contractor possesses all skills, licenses, certifications and qualifications
                                    necessary to enable the Contractor to perform the services required hereunder.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    6.2	Without limiting the foregoing, the Contractor has a current, valid flight attendant license and type rating for the Aircraft without conditions or limitations, or will have same prior to Dispatch as well as a valid
                                    1st class medical certification and will maintain them for the duration of this Agreement.
                                </li>
                                <br />



                            </ul>
                            <h4>  7)
                                Medical/Training Costs
                            </h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor is responsible to pay for its own medical certification,
                                    inoculations and Initial and/or Recurrent training costs and all related expenses.
                                </li>
                                <br />



                            </ul>
                        </>
                    }
                    {
                        pagination === "four" &&
                        <>
                            <h5>  8) Non-employment/Non-solicitation/Non-communication Rules</h5>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    With any AirCrewConnect client and/or client's guests and/or client's end user or own customer to which AirCrewConnect has dispatched or has offered to dispatch the Contractor or on any aircraft (identified by serial number) the Contractor has
                                    supplied its services pursuant to the present Agreement, the Contractor is prohibited from:




                                    <li style={{ fontSize: "11px" }}>


                                        <li style={{ fontSize: "11px" }}>
                                            Soliciting, accepting or undertaking, directly or indirectly, a full or part time employment or contractor position in any capacity related to crew or aircraft support services (including but not limited to charter, leasing, management,
                                            interim lift and aircraft sales/acquisitions services);
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>

                                            Referring or suggesting a party other than AirCrewConnect for the provision of any crew or aircraft support services (including but not limited to charter, leasing,
                                            management, interim lift, sale and acquisitions of aircraft services);

                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            Communicating with crew mates and/or AirCrewConnect client, client representatives or guests about the terms and conditions of this
                                            Agreement and the payment to the Contractor of fees, per diem and/or expenses;
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            Soliciting payment from an AirCrewConnect client, client representative and/or guests.
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            Distributing and/or publishing in any format or form, including but not limited to any public forums, billboards, websites, Twitter™, MySpace™, Youtube™, Facebook™, Instagram™, Snapchat™, bulletin boards, or likewise, any photos, videos, descriptions, anecdotes, essays or other of the Aircraft,
                                            AirCrewConnect, AirCrewConnect' client and/or client's guests.
                                        </li>
                                        <br />

                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>

                                        The prohibitions above also apply to all aircraft manufacturers' end-users and their guests if the Contractor is on a Dispatch for
                                        an assignment where the aircraft manufacturer is AirCrewConnect' client.

                                    </li>
                                    <br />

                                </li>
                            </ul>
                            <h4>  9) Non-disclosure</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor must maintain the terms and conditions of this Agreement confidential.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Notwithstanding the foregoing, the Contractor may discuss
                                    and review this Agreement with his attorney and/or accountant/personal banker.
                                </li>
                                <br />




                            </ul>
                        </>

                    }
                    {
                        pagination === "five" &&
                        <>
                            <h5>  10) Default and Penalties </h5>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor is
                                    responsible for AirCrewConnect
                                    or Client property used by the Contractor
                                    during its Dispatch, (such as mobile phones, tablets, laptops, etc.) and may be held responsible for the replacement cost of such items should the Contractor damage them, lose them or fail to return them in good working order.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor may also be held liable for unjustified costs incurred by AirCrewConnect or the Client for excessive or non-duty related use by the Contractor of services such as Satcom or Wi-Fi, or
                                    carelessness in the use of such similar services or subscriptions.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    A Default is defined as any breach of this Agreement by the Contractor and, without limiting
                                    the generality of the foregoing, includes but is not limited to,
                                    <br />
                                    <ul>

                                        <li style={{ fontSize: "11px" }}>
                                            arriving or setting off to a Dispatch without proper, valid documentation (flight attendant license, medical certificate, passport, visas, validations and any other mandatory required documentation, etc.);
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            improper or impolite conduct with crew mates, AirCrewConnect representatives and/or AirCrewConnect’s client, client’s representatives and/or guests
                                            for which the Contractor has been previously notified to correct and/or remedy.
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            material dishonesty;
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            material violation of Dispatch or AirCrewConnect instructions;
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            intemperance and/or dissipation which may reasonably impact the performance of this Agreement;
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            non-performance of services or willful neglect in the performance of services hereunder; and
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            a breach of any Section of this Agreement.
                                        </li>

                                        <br />


                                    </ul>

                                </li>
                                <br />

                                <li style={{ fontSize: "11px" }}>
                                    <li style={{ fontSize: "11px" }}>
                                        For each breach of a Section and/or Subsection
                                        of the present heading, the Contractor is liable

                                        and will pay AirCrewConnect all direct and consequential damages, suffered by AirCrewConnect and, without limiting the generality of the foregoing, such damages are hereby set at a minimum amount of 25,000.00$USD.
                                    </li>

                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Should the Contractor be approached for an employment or contractor position by an AirCrewConnect client or AirCrewConnect client’s guest, the Contractor shall notify AirCrewConnect so as to permit it to enter discussions with said AirCrewConnect client or client’s guest and evaluate the possibility of
                                    providing the Contractor a release from all or part of the conditions of the present heading.
                                </li>
                                <br />

                            </ul>

                            <h4>  11) Term and Termination of Agreement</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    This Agreement shall remain valid for a period of
                                    three (3) years (the “Term”), unless otherwise terminated pursuant to the terms herein.

                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    If the Term ends during a Dispatch, the parties hereby agree to automatically extend
                                    the Term until completion of that Dispatch, under the same terms and conditions herein.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>

                                    AirCrewConnect may terminate this
                                    Agreement for Default, as defined in section 10.3 above, effective immediately upon written notice.

                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>


                                    Except for Subsections 8.1.3, 8.1.4 and 8.1.5 which shall survive
                                    indefinitely, the Sections and Subsections under the present heading

                                    shall apply during the Term of this Agreement, as well as any extension
                                    thereof, and for an additional period of twelve (12) months thereafter.


                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    AirCrewConnect may also immediately terminate a Dispatch and/or this Agreement without cause if AirCrewConnect’ client gives AirCrewConnect a notice of
                                    termination or suspension of the project to which the Contractor was assigned


                                </li>
                                <br />




                            </ul>

                        </>

                    }
                    {
                        pagination === "six" &&
                        <>
                            <h4>  12)		Notifications </h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    AirCrewConnect communications with and
                                    notifications to the Contractor will be validly conducted and delivered by email to the following e-mail address (the “Contractor’s Notification Address”).
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>

                                    AirCrewConnect communications with and
                                    notifications to the Contractor will be validly conducted and delivered by email to the following e-mail address (the “Contractor’s Notification Address”).

                                    <br />
                                </li>
                                <br />



                            </ul>
                            <h4>  13)		Miscellaneous</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    Applicable Law. This Agreement is deemed to have been signed and executed by the parties in Dubai, United Arab Emirates, and will be governed by the laws
                                    of United Arab Emirates applicable therein, without regard to conflict of law provisions.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>

                                    Should a failure of service occur of the provided Crew Member defined in Appendix 1 not be able to complete the assigned contracted support for any reason then it will remain the sole responsibility of
                                    AirCrewConnect to provide within a reasonable time a suitable replacement crew member.


                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Exclusive Jurisdiction. The Contractor accepts and acknowledges that the Courts of the United Arab Emirates, as the case may be, have exclusive, non-revocable jurisdiction concerning any dispute, claim or controversy between the parties to this Agreement arising from the application, interpretation, breach or performance of this Agreement. However, AirCrewConnect may institute proceedings in any jurisdiction should it seek an injunctive relief or order against the Contractor or
                                    seek foreign enforcement of a final order or judgment issued by the jurisdiction above.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Notwithstanding the foregoing, AirCrewConnect may elect to sell convey and/or transfer any of its claims herein to a collection agency, at AirCrewConnect’
                                    sole discretion, in which case such a collection agency will not be bound by Subsection
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    This Agreement is the only agreement between the parties and replaces and/or supersedes any previous agreement between
                                    the parties, unless otherwise specifically provided herein.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Language. The parties have requested that this Agreement
                                    and all notices, documents or court proceedings thereto related be drafted in English.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    IN WITNESS WHEREOF, the parties are deemed to have
                                    executed this Agreement in Dubai, UAE as of the date first mentioned hereinabove.
                                </li>
                                <br />




                            </ul>









                        </>

                    }
                    {
                        pagination === "seven" &&
                        <>

                            <h3 className='text-center'>Authorization Form</h3>
                            <p className='text-center' style={{ fontSize: "13px" }}>
                                (in support to Support Services Agreement)
                            </p>

                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    This Authorization Form is in support to the 19th January, 2022 Pilot Services Agreement between Matrix Aviation Limited ‘AirCrewConnect’ and Anne Lohmann (the "Agreement"). Unless otherwise defined,
                                    capitalized terms herein have the same meaning as in the Agreement.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor hereby authorizes AirCrewConnect to request and obtain copies of its full training records from any training facility including but not limited to the make and model of flight training equipment used; evaluation of performance on each lesson and the name of the instructor providing instruction; results of each end-of-course practical test and the name of the evaluator conducting the test; and
                                    the number of hours of additional training accomplished after any unsatisfactory practical test.



                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>

                                    The Contractor hereby further instructs such facility to comply with AirCrewConnect' request in a timely fashion without the necessity
                                    to notify the Contractor, and as if the Contractor had made the request itself


                                </li>
                                <br />




                            </ul>
                            <p className='text-center' style={{ fontSize: "12px" }}>
                                IN WITNESS WHEREOF, the parties are deemed to have executed this
                                Authorization Form in Dubai, UAE, as of the same date of execution as the Agreement.
                            </p>

                            <Row>
                                <Col>
                                    <h5>
                                        AirCrewConnect.

                                        <hr mt-3 />

                                    </h5>

                                    <h4>
                                        MATTHEW HARRISON


                                    </h4>
                                </Col>
                                <Col>
                                    <h5>
                                        CONTRACTOR: Ouarda Mouloudi
                                        <hr mt-3 />
                                    </h5>

                                </Col>
                            </Row>







                        </>

                    }




                </Modal.Body>
                <Modal.Footer className="justify-content-center px-4">
                    {
                        <ul className="pagination">

                            <li className="page-item"><a class="page-link"
                                onClick={() => setPagination('one')} style={{ cursor: "pointer" }}>1</a></li>
                            <li className="page-item"><a class="page-link"
                                onClick={() => setPagination('two')} style={{ cursor: "pointer" }}>2</a></li>
                            <li className="page-item"><a class="page-link"
                                onClick={() => setPagination('three')} style={{ cursor: "pointer" }} >3</a></li>
                            <li className="page-item"><a class="page-link"
                                onClick={() => setPagination('four')} style={{ cursor: "pointer" }} >4</a></li>
                            <li className="page-item"><a class="page-link"
                                onClick={() => setPagination('five')} style={{ cursor: "pointer" }} >5</a></li>
                            <li className="page-item"><a class="page-link"
                                onClick={() => setPagination('six')} style={{ cursor: "pointer" }} >6</a></li>
                            <li className="page-item"><a class="page-link"
                                onClick={() => setPagination('seven')} style={{ cursor: "pointer" }} >7</a></li>

                        </ul>
                        //   <Button className="" color="dark" type="button"
                        //      >
                        //       Upload
                        //   </Button>
                        //   <button
                        //       className="btn btn-danger"
                        //       variant="danger"
                        //       onClick={handleClose}
                        //   >
                        //       Close
                        //   </button>
                    }
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default PilotModal