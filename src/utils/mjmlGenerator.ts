import type { Data } from "@measured/puck";
import { getContrastColor } from "./colorUtils";

export function generateMjml(data: Data): string {
	const renderZone = (zoneKey: string): string => {
		const blocks = data.zones?.[zoneKey] || [];
		return blocks.map(renderBlock).join("");
	};

	const renderBlock = (block: any): string => {
		switch (block.type) {
			case "Section":
				return `
          <mj-section background-color="${block.props.backgroundColor}" padding="${block.props.padding}px">
            <mj-column>
              ${renderZone(`${block.props.id}:content`)}
            </mj-column>
          </mj-section>
        `;
			case "Columns": {
				const columns = Array.from({ length: block.props.columnCount })
					.map((_, i) => {
						return `
            <mj-column>
              ${renderZone(`${block.props.id}:column-${i}`)}
            </mj-column>
          `;
					})
					.join("");
				return `
          <mj-section background-color="${block.props.backgroundColor}" padding="${block.props.padding}px">
            ${columns}
          </mj-section>
        `;
			}
			case "HeroLayout":
				return `
          <mj-hero mode="fluid-height" background-width="600px" background-height="${block.props.minHeight}px" background-url="${block.props.bgImage}" background-color="${block.props.bgColor}" padding="${block.props.padding}px">
            ${renderZone(`${block.props.id}:hero-content`)}
          </mj-hero>
        `;
			case "TextBlock":
				return `
          <mj-text color="${block.props.color}" font-size="${block.props.fontSize}px" align="${block.props.align}" padding="${block.props.padding}px">
            ${block.props.content}
          </mj-text>
        `;
			case "CTAButton": {
				const ctaTextColor = getContrastColor(block.props.bgColor);
				return `
          <mj-button align="${block.props.align}" href="${block.props.link}" background-color="${block.props.bgColor}" color="${ctaTextColor}" border-radius="${block.props.borderRadius}px" padding="${block.props.padding}px">
            ${block.props.text}
          </mj-button>
        `;
			}
			case "Image":
				if (!block.props.src) return ""; // Skip empty skeletons in export
				return `
          <mj-image align="${block.props.align}" src="${block.props.src}" alt="${block.props.alt}" width="${block.props.width}%" href="${block.props.link || ""}" padding="${block.props.padding}px" />
        `;
			case "Divider":
				return `
          <mj-divider border-color="${block.props.color}" border-width="${block.props.thickness}px" padding="${block.props.padding}px" />
        `;
			case "RawHTML":
				return `
          <mj-raw>
            ${block.props.html}
          </mj-raw>
        `;
			case "LogoBlock": {
				const widthMap: Record<string, string> = {
					S: "100px",
					M: "150px",
					L: "200px",
				};
				const logoWidth = widthMap[block.props.width] || "150px";
				return `
          <mj-image align="${block.props.align}" src="${block.props.src}" alt="${block.props.alt}" width="${logoWidth}" href="${block.props.link || ""}" padding="${block.props.padding}px" container-background-color="${block.props.transparentBg ? "transparent" : "#ffffff"}" />
        `;
			}
			case "TitleBlock":
				return `
          <mj-text color="${block.props.color}" font-size="${block.props.fontSize}px" align="${block.props.align}" font-weight="bold" padding="${block.props.padding}px">
            ${block.props.text}
          </mj-text>
        `;
			case "SpacerBlock":
				return `
          <mj-spacer height="${block.props.size}px" container-background-color="${block.props.transparentBg ? "transparent" : "#ffffff"}" />
        `;
			case "PreheaderBlock":
				return `
          <mj-section padding="${block.props.padding}px">
            <mj-column>
              <mj-text font-size="12px" color="#666666" align="center">
                ${block.props.previewText}
              </mj-text>
              <mj-text font-size="12px" color="#666666" align="center">
                <a href="${block.props.webVersionLink}">View in browser</a> | <a href="${block.props.unsubscribeLink}">Unsubscribe</a>
              </mj-text>
            </mj-column>
          </mj-section>
        `;
			case "FooterBlock":
				return `
          <mj-section padding="${block.props.padding}px">
            <mj-column>
              <mj-text font-size="12px" color="#999999" align="center">
                ${block.props.content}
              </mj-text>
            </mj-column>
          </mj-section>
        `;
			case "SocialBlock": {
				const networks = (block.props.networks || "facebook,twitter,instagram")
					.split(",")
					.map((n: string) => n.trim());
				const socialItems = networks
					.map(
						(n: string) => `
          <mj-social-element name="${n}" href="#"></mj-social-element>
        `,
					)
					.join("");
				return `
          <mj-social align="${block.props.align}" icon-size="24px" mode="horizontal" padding="${block.props.padding}px">
            ${socialItems}
          </mj-social>
        `;
			}
			case "DoubleImageBlock":
				return `
          <mj-section padding="${block.props.padding}px">
            <mj-column>
              <mj-image src="${block.props.img1Src}" href="${block.props.img1Link}" padding="${block.props.gutterVisible ? "0 10px 0 0" : "0"}" />
            </mj-column>
            <mj-column>
              <mj-image src="${block.props.img2Src}" href="${block.props.img2Link}" padding="${block.props.gutterVisible ? "0 0 0 10px" : "0"}" />
            </mj-column>
          </mj-section>
        `;
			case "TripleImageBlock":
				return `
          <mj-section padding="${block.props.padding}px">
            <mj-column>
              <mj-image src="${block.props.img1Src}" href="${block.props.img1Link}" padding="${block.props.gutterVisible ? "0 5px 0 0" : "0"}" />
            </mj-column>
            <mj-column>
              <mj-image src="${block.props.img2Src}" href="${block.props.img2Link}" padding="${block.props.gutterVisible ? "0 5px 0 5px" : "0"}" />
            </mj-column>
            <mj-column>
              <mj-image src="${block.props.img3Src}" href="${block.props.img3Link}" padding="${block.props.gutterVisible ? "0 0 0 5px" : "0"}" />
            </mj-column>
          </mj-section>
        `;
			case "ConversationBlock": {
				const messages = block.props.messages || [];
				const msgHtml = messages
					.map((m: any) => {
						const isUser = m.role === "user";
						const bgColor = isUser
							? block.props.userColor
							: block.props.agentColor;
						const textColor = getContrastColor(bgColor);
						const align = isUser ? "right" : "left";
						return `
            <mj-text align="${align}" padding="5px">
              <span style="background-color: ${bgColor}; color: ${textColor}; padding: 10px; border-radius: 10px; display: inline-block;">
                ${m.text}
              </span>
            </mj-text>
          `;
					})
					.join("");
				return `
          <mj-section padding="${block.props.padding}px">
            <mj-column>
              ${msgHtml}
            </mj-column>
          </mj-section>
        `;
			}
			case "SingleArticleBlock": {
				const singleBtnTextColor = getContrastColor(
					block.props.buttonBgColor || "#2563eb",
				);
				return `
          <mj-section padding="${block.props.padding}px">
            <mj-column>
              <mj-image src="${block.props.imageSrc}" padding="0" />
              <mj-text font-size="20px" font-weight="bold" padding="10px 0">
                ${block.props.title}
              </mj-text>
              <mj-text font-size="14px" padding="0 0 10px 0">
                ${block.props.text}
              </mj-text>
              <mj-button href="${block.props.buttonLink}" align="left" padding="0" background-color="${block.props.buttonBgColor || "#2563eb"}" color="${singleBtnTextColor}">
                ${block.props.buttonText}
              </mj-button>
            </mj-column>
          </mj-section>
        `;
			}
			case "SideArticleBlock": {
				const sideBtnTextColor = getContrastColor(
					block.props.buttonBgColor || "#2563eb",
				);
				const imgCol = `
          <mj-column>
            <mj-image src="${block.props.imageSrc}" padding="0" />
          </mj-column>
        `;
				const textCol = `
          <mj-column>
            <mj-text font-size="20px" font-weight="bold" padding="0 0 10px 0">
              ${block.props.title}
            </mj-text>
            <mj-text font-size="14px" padding="0 0 10px 0">
              ${block.props.text}
            </mj-text>
            <mj-button href="${block.props.buttonLink}" align="left" padding="0" background-color="${block.props.buttonBgColor || "#2563eb"}" color="${sideBtnTextColor}">
                ${block.props.buttonText}
            </mj-button>
          </mj-column>
        `;
				return `
          <mj-section padding="${block.props.padding}px">
            ${block.props.imagePos === "left" ? imgCol + textCol : textCol + imgCol}
          </mj-section>
        `;
			}
			case "DoubleArticleBlock":
				return `
          <mj-section background-color="#ffffff" padding="${block.props.padding}px">
            <mj-column width="50%" padding-right="10px">
              ${renderZone(`${block.props.id}:left-article`)}
            </mj-column>
            <mj-column width="50%" padding-left="10px">
              ${renderZone(`${block.props.id}:right-article`)}
            </mj-column>
          </mj-section>
        `;
			case "TripleArticleBlock":
				return `
          <mj-section background-color="#ffffff" padding="${block.props.padding}px">
            <mj-column width="33.33%" padding-right="10px">
              ${renderZone(`${block.props.id}:left-article`)}
            </mj-column>
            <mj-column width="33.33%" padding="0 5px">
              ${renderZone(`${block.props.id}:middle-article`)}
            </mj-column>
            <mj-column width="33.33%" padding-left="10px">
              ${renderZone(`${block.props.id}:right-article`)}
            </mj-column>
          </mj-section>
        `;
			case "LegalPreviewBlock":
				return `
          <mj-section padding="${block.props.padding}px">
            <mj-column>
              <mj-image src="${block.props.imageSrc}" alt="${block.props.altText}" padding="0" />
              <mj-text font-size="10px" color="#999999" align="center" padding="10px 0 0 0">
                ${block.props.legalText}
              </mj-text>
            </mj-column>
          </mj-section>
        `;
			case "RatingBlock": {
				const isNPS = block.props.scale === "10";
				const items = Array.from({ length: isNPS ? 11 : 5 }).map((_, i) =>
					isNPS ? i : i + 1,
				);

				const ratingButtons = items
					.map((item) => {
						if (isNPS) {
							return `<td style="padding: 0 2px;"><a href="#" style="display: inline-block; width: 36px; height: 36px; line-height: 36px; text-align: center; background-color: #f1f5f9; color: ${block.props.color}; border: 1px solid #cbd5e1; border-radius: 4px; text-decoration: none; font-size: 16px; font-weight: bold;">${item}</a></td>`;
						} else {
							return `<td style="padding: 0 4px;"><a href="#" style="display: inline-block; color: #fbbf24; text-decoration: none; font-size: 32px; font-weight: bold;">★</a></td>`;
						}
					})
					.join("");

				const npsLabels = isNPS
					? `
          <tr>
            <td colspan="5" style="text-align: left; font-size: 12px; color: #64748b; padding-top: 8px;">Not likely</td>
            <td colspan="6" style="text-align: right; font-size: 12px; color: #64748b; padding-top: 8px;">Very likely</td>
          </tr>
        `
					: "";

				return `
          <mj-section padding="${block.props.padding}px" background-color="${block.props.bgColor}">
            <mj-column>
              <mj-text font-size="18px" color="#333333" align="center" padding="0 0 15px 0">
                ${block.props.question}
              </mj-text>
              <mj-text align="center" padding="0">
                <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                  <tr>
                    ${ratingButtons}
                  </tr>
                  ${npsLabels}
                </table>
              </mj-text>
            </mj-column>
          </mj-section>
        `;
			}
			case "EventInvitePreset": {
				const eventBtnTextColor = getContrastColor(block.props.buttonBgColor);
				return `
          <mj-section padding="${block.props.padding}px" background-color="${block.props.bgColor}">
            <mj-column>
              <mj-text font-size="24px" color="#0f172a" align="center" padding="0 0 15px 0">
                ${block.props.eventName}
              </mj-text>
              <mj-text align="center" padding="0 0 20px 0">
                <div style="display: inline-block; text-align: left; background-color: #ffffff; padding: 15px 25px; border-radius: 6px; border: 1px solid #e2e8f0;">
                  <p style="margin: 0 0 8px 0; font-size: 15px; color: #334155;">📅 <strong>Date:</strong> ${block.props.date}</p>
                  <p style="margin: 0 0 8px 0; font-size: 15px; color: #334155;">⏰ <strong>Time:</strong> ${block.props.time}</p>
                  <p style="margin: 0; font-size: 15px; color: #334155;">📍 <strong>Location:</strong> ${block.props.location}</p>
                </div>
              </mj-text>
              <mj-text font-size="16px" color="#475569" line-height="1.5" align="center" padding="0 0 20px 0">
                ${block.props.description}
              </mj-text>
              <mj-button href="${block.props.buttonLink}" background-color="${block.props.buttonBgColor}" color="${eventBtnTextColor}" border-radius="4px" font-weight="bold" font-size="16px" padding="0">
                ${block.props.buttonText}
              </mj-button>
            </mj-column>
          </mj-section>
        `;
			}
			case "PromoBannerPreset":
				return `
          <mj-section padding="${block.props.padding}px" background-color="${block.props.bgColor}">
            <mj-column>
              <mj-text align="center" padding="0 0 15px 0">
                <span style="display: inline-block; border: 2px solid ${block.props.textColor}; color: ${block.props.textColor}; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 14px; letter-spacing: 1px;">${block.props.discount}</span>
              </mj-text>
              <mj-text font-size="32px" color="${block.props.textColor}" font-weight="900" text-transform="uppercase" align="center" padding="0 0 10px 0">
                ${block.props.title}
              </mj-text>
              <mj-text font-size="18px" color="${block.props.textColor}" align="center" padding="0 0 20px 0">
                ${block.props.subtitle}
              </mj-text>
              <mj-button href="${block.props.buttonLink}" background-color="${block.props.textColor}" color="${block.props.bgColor}" border-radius="30px" font-weight="bold" font-size="16px" text-transform="uppercase" padding="0">
                ${block.props.buttonText}
              </mj-button>
            </mj-column>
          </mj-section>
        `;
			case "TestimonialPreset": {
				const stars = Array.from({ length: 5 })
					.map(
						(_, i) =>
							`<span style="color: ${i < block.props.rating ? "#fbbf24" : "#e2e8f0"}; font-size: 20px;">★</span>`,
					)
					.join("");
				return `
          <mj-section padding="${block.props.padding}px" background-color="${block.props.bgColor}">
            <mj-column>
              <mj-text align="center" padding="0 0 15px 0">
                ${stars}
              </mj-text>
              <mj-text font-size="18px" color="#1e293b" font-style="italic" line-height="1.6" align="center" padding="0 0 20px 0">
                "${block.props.quote}"
              </mj-text>
              <mj-image src="${block.props.avatarSrc}" width="50px" border-radius="25px" padding="0 0 10px 0" />
              <mj-text font-size="16px" color="#0f172a" font-weight="bold" align="center" padding="0 0 4px 0">
                ${block.props.authorName}
              </mj-text>
              <mj-text font-size="14px" color="#64748b" align="center" padding="0">
                ${block.props.authorRole}
              </mj-text>
            </mj-column>
          </mj-section>
        `;
			}
			case "FeatureAnnouncementPreset": {
				const featBtnTextColor = getContrastColor(block.props.buttonBgColor);
				return `
          <mj-section padding="${block.props.padding}px" background-color="${block.props.bgColor}">
            <mj-column>
              <mj-text align="center" padding="0 0 15px 0">
                <span style="display: inline-block; background-color: #e0e7ff; color: #4338ca; padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">${block.props.badgeText}</span>
              </mj-text>
              <mj-text font-size="28px" color="#111827" font-weight="bold" align="center" padding="0 0 15px 0">
                ${block.props.title}
              </mj-text>
              <mj-text font-size="16px" color="#4b5563" line-height="1.6" align="center" padding="0 0 25px 0">
                ${block.props.description}
              </mj-text>
              <mj-image src="${block.props.imageSrc}" border-radius="8px" padding="0 0 25px 0" />
              <mj-button href="${block.props.buttonLink}" background-color="${block.props.buttonBgColor}" color="${featBtnTextColor}" border-radius="6px" font-weight="bold" font-size="16px" padding="0">
                ${block.props.buttonText}
              </mj-button>
            </mj-column>
          </mj-section>
        `;
			}
			case "CountdownTimer":
				return `
          <mj-section padding="${block.props.padding}px" background-color="${block.props.bgColor}">
            <mj-column>
              <mj-text align="center" color="${block.props.color}" font-family="monospace" font-size="24px" font-weight="bold">
                <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Offer Ends: ${block.props.endDate}</div>
                <div style="display: inline-block; margin-top: 10px;">
                  <div style="display: inline-block; text-align: center; margin: 0 5px;">
                    <div>00</div>
                    <div style="font-size: 10px; font-weight: normal;">DAYS</div>
                  </div>
                  <div style="display: inline-block; margin: 0 5px;">:</div>
                  <div style="display: inline-block; text-align: center; margin: 0 5px;">
                    <div>00</div>
                    <div style="font-size: 10px; font-weight: normal;">HRS</div>
                  </div>
                  <div style="display: inline-block; margin: 0 5px;">:</div>
                  <div style="display: inline-block; text-align: center; margin: 0 5px;">
                    <div>00</div>
                    <div style="font-size: 10px; font-weight: normal;">MIN</div>
                  </div>
                  <div style="display: inline-block; margin: 0 5px;">:</div>
                  <div style="display: inline-block; text-align: center; margin: 0 5px;">
                    <div>00</div>
                    <div style="font-size: 10px; font-weight: normal;">SEC</div>
                  </div>
                </div>
              </mj-text>
            </mj-column>
          </mj-section>
        `;
			case "GamifiedPopupPreset":
				return `
          <mj-section padding="${block.props.padding}px" background-color="${block.props.bgColor}">
            <mj-column>
              <mj-text align="center" font-size="64px" padding="0 0 10px 0">🎡</mj-text>
              <mj-text align="center" font-size="36px" font-weight="900" color="${block.props.textColor}" padding="0 0 15px 0">
                ${block.props.title}
              </mj-text>
              <mj-text align="center" font-size="16px" color="${block.props.textColor}" line-height="1.5" padding="0 0 25px 0">
                ${block.props.subtitle}
              </mj-text>
              <mj-button href="#" background-color="#f59e0b" color="#ffffff" border-radius="6px" font-weight="bold" font-size="18px" padding="0">
                ${block.props.buttonText}
              </mj-button>
            </mj-column>
          </mj-section>
        `;
			default:
				return "";
		}
	};

	const isLayoutBlock = (type: string) =>
		[
			"Section",
			"Columns",
			"HeroLayout",
			"PreheaderBlock",
			"FooterBlock",
			"DoubleImageBlock",
			"TripleImageBlock",
			"ConversationBlock",
			"SingleArticleBlock",
			"SideArticleBlock",
			"DoubleArticleBlock",
			"TripleArticleBlock",
			"LegalPreviewBlock",
			"RatingBlock",
			"RawHTML",
			"EventInvitePreset",
			"PromoBannerPreset",
			"TestimonialPreset",
			"FeatureAnnouncementPreset",
			"GamifiedPopupPreset",
		].includes(type);

	const renderRootBlock = (block: any): string => {
		if (isLayoutBlock(block.type)) {
			return renderBlock(block);
		} else {
			return `
        <mj-section padding="0px">
          <mj-column>
            ${renderBlock(block)}
          </mj-column>
        </mj-section>
      `;
		}
	};

	const body = data.content.map(renderRootBlock).join("");

	const rootProps = (data.root?.props as any) || {};
	const bgColor = rootProps.backgroundColor || "#ffffff";
	const title = rootProps.title || "Email Template";
	const fontFamily = rootProps.fontFamily || "Arial, sans-serif";
	const textColor = rootProps.textColor || "#333333";

	return `
    <mjml>
      <mj-head>
        <mj-title>${title}</mj-title>
        <mj-attributes>
          <mj-all font-family="${fontFamily}" color="${textColor}" />
        </mj-attributes>
      </mj-head>
      <mj-body background-color="${bgColor}">
        ${body}
      </mj-body>
    </mjml>
  `;
}
