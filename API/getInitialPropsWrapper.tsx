/* import cookies from 'next-cookies';
import { Component } from 'react';
import { serialize } from 'cookie';
import { NextPageContext } from 'next';
import { getFundsForReport, getReportById } from './report';
import { ServerApiError } from '../../interfaces/interfaces';
import Error from 'next/error';
import { errorTitleBasedOnStatusCode } from '../../helpers/common';
import {
    getAccountsData,
    getFundFactsData,
    getFundTextsData
} from '../../api/fundsDataEditing';

interface Props {
    forbidden: boolean;
    error: ServerApiError;
}

async function getFundsData(
    dataType: string,
    reportId: string,
    fundId: string,
    languageId: string,
    token: string
) {
    switch (dataType) {
        case 'Meta':
        case 'Texts':
            return await getFundTextsData(reportId, fundId, languageId, token);
        case 'Standard texts':
        case 'FundFacts':
            return await getFundFactsData(
                reportId,
                fundId,
                null,
                languageId,
                token
            );
        case 'Risk':
        case 'Holdings':
        case 'HoldingsSum':
        case 'Accounts':
            return await getAccountsData(reportId, fundId, languageId, token);
        case 'Issuers':
        case 'SFTR':
        case 'SFTRSum':
        case 'Footnotes':
    }
}

const FundInReportWrapper = function(
    Child,
    dataType = ''
): React.ComponentClass {
    return class Higher extends Component<Props> {
        constructor(props: Props) {
            super(props);
        }

        static async getInitialProps(ctx: NextPageContext) {
            const token = cookies(ctx)[process.env.COOKIE_ACCESS_TOKEN_NAME];
            const { languageId } = ctx.query;
            const reportId = ctx.query.reportId as string;
            const fundId = ctx.query.fundId as string;
            try {
                const report = await getReportById(reportId, token);
                const funds = (
                    await getFundsForReport(
                        reportId,
                        languageId,
                        token
                    )
                ).sort((a, b) =>
                    a.nameInReport === null
                        ? 1
                        : b.nameInReport === null
                        ? -1
                        : a.nameInReport.localeCompare(b.nameInReport)
                );

                const locked = funds.find(fund => fund.fundId === fundId)
                    .locked;

                const data = await getFundsData(
                    dataType,
                    reportId,
                    fundId,
                    languageId as string,
                    token
                );

                //if (Child.getInitialProps) return Child.getInitialProps(ctx);

                return {
                    report,
                    funds,
                    data,
                    reportId,
                    fundId,
                    languageId,
                    locked
                };
            } catch (err) {
                return { error: err };
            }
        }

        render() {
            const { error } = this.props;
            if (error) {
                return (
                    <Error
                        statusCode={error.statusCode}
                        title={errorTitleBasedOnStatusCode(error.statusCode)}
                    />
                );
            }
            return <Child {...this.props} />;
        }
    };
};

export default FundInReportWrapper; */