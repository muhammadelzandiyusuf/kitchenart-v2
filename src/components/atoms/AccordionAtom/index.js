import { React, Suspense, Accordion, AccordionSummary, AccordionDetails, ExpandMore, Typography } from 'libraries';

const AccordionAtom = (props) => {

    return (
        <Suspense fallback={null}>
            <Accordion className={props.styleAccordion} onChange={props.changed}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={props.styleTitle}>{props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {props.children}
                </AccordionDetails>
            </Accordion>
        </Suspense>
    );
};

export default AccordionAtom;