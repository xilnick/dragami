import type { Data } from "@measured/puck";
import DOMPurify from "dompurify";
import { getContrastColor } from "./colorUtils";

export function generateHtml(data: Data): string {
	const renderZone = (zoneKey: string): string => {
		const blocks = data.zones?.[zoneKey] || [];
		return blocks.map(renderBlock).join("");
	};

	const renderBlock = (block: any): string => {
		switch (block.type) {
			case "Section":
				return `
          <div style="background-color: ${block.props.backgroundColor}; padding: ${block.props.padding}px;">
            ${renderZone(`${block.props.id}:content`)}
          </div>
        `;
			case "Columns": {
				const columns = Array.from({ length: block.props.columnCount })
					.map((_, i) => {
						return `
            <div style="flex: 1;">
              ${renderZone(`${block.props.id}:column-${i}`)}
            </div>
          `;
					})
					.join("");
				return `
          <div style="display: flex; gap: ${block.props.gutter}px; padding: ${block.props.padding}px; background-color: ${block.props.backgroundColor};">
            ${columns}
          </div>
        `;
			}
			case "HeroLayout":
				return `
          <div style="background-color: ${block.props.bgColor}; background-image: ${block.props.bgImage ? `url(${block.props.bgImage})` : "none"}; background-size: cover; background-position: center; padding: ${block.props.padding}px; min-height: ${block.props.minHeight}px; display: flex; flex-direction: column; justify-content: center;">
            ${renderZone(`${block.props.id}:hero-content`)}
          </div>
        `;
			case "TextBlock":
				return `
          <div style="color: ${block.props.color}; font-size: ${block.props.fontSize}px; text-align: ${block.props.align}; padding: ${block.props.padding}px;">
            ${block.props.content}
          </div>
        `;
			case "ListBlock": {
				const items = block.props.items || [];
				const listType = block.props.listType === "ol" ? "ol" : "ul";
				const listItems = items
					.map(
						(item: any) => `<li style="margin-bottom: 8px;">${item.text}</li>`,
					)
					.join("");
				const listStyleType =
					block.props.listType === "ol" ? "decimal" : "disc";

				return `
          <div style="color: ${block.props.color}; font-size: ${block.props.fontSize}px; padding: ${block.props.padding}px;">
            <${listType} style="margin: 0; padding-left: 20px; list-style-type: ${listStyleType};">
              ${listItems}
            </${listType}>
          </div>
        `;
			}
			case "CTAButton": {
				const ctaTextColor = getContrastColor(block.props.bgColor);
				return `
          <div style="text-align: ${block.props.align}; padding: ${block.props.padding}px;">
            <a href="${block.props.link}" style="display: inline-block; padding: 12px 24px; background-color: ${block.props.bgColor}; color: ${ctaTextColor}; text-decoration: none; border-radius: ${block.props.borderRadius}px; font-weight: bold;">
              ${block.props.text}
            </a>
          </div>
        `;
			}
			case "Image": {
				if (!block.props.src) return "";
				const margin =
					block.props.align === "center"
						? "0 auto"
						: block.props.align === "right"
							? "0 0 0 auto"
							: "0";
				const img = `<img src="${block.props.src}" alt="${block.props.alt}" style="width: ${block.props.width}%; height: auto; display: block; margin: ${margin};" />`;
				return `
          <div style="padding: ${block.props.padding}px;">
            ${block.props.link ? `<a href="${block.props.link}">${img}</a>` : img}
          </div>
        `;
			}
			case "VideoBlock": {
				if (!block.props.src) return "";
				const margin =
					block.props.align === "center"
						? "0 auto"
						: block.props.align === "right"
							? "0 0 0 auto"
							: "0";
				const img = `
          <div style="position: relative; width: ${block.props.width}%; margin: ${margin};">
            <img src="${block.props.src}" alt="${block.props.alt}" style="width: 100%; height: auto; display: block;" />
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background-color: rgba(0, 0, 0, 0.6); border-radius: 50%; display: flex; align-items: center; justify-content: center; pointer-events: none;">
              <div style="width: 0; height: 0; border-top: 15px solid transparent; border-bottom: 15px solid transparent; border-left: 25px solid white; margin-left: 5px;"></div>
            </div>
          </div>
        `;
				return `
          <div style="padding: ${block.props.padding}px;">
            ${block.props.link ? `<a href="${block.props.link}">${img}</a>` : img}
          </div>
        `;
			}
			case "Divider":
				return `
          <div style="padding: ${block.props.padding}px;">
            <hr style="border: none; border-top: ${block.props.thickness}px solid ${block.props.color}; margin: 0;" />
          </div>
        `;
			case "RawHTML":
				return `
          <div style="padding: ${block.props.padding}px;">
            ${block.props.html}
          </div>
        `;
			case "LogoBlock": {
				const widthMap: Record<string, string> = {
					S: "100px",
					M: "150px",
					L: "200px",
				};
				const logoWidth = widthMap[block.props.width] || "150px";
				const logoMargin =
					block.props.align === "center"
						? "0 auto"
						: block.props.align === "right"
							? "0 0 0 auto"
							: "0";
				return `
          <div style="padding: ${block.props.padding}px; background-color: ${block.props.transparentBg ? "transparent" : "#ffffff"};">
            <img src="${block.props.src}" alt="${block.props.alt}" style="width: ${logoWidth}; display: block; margin: ${logoMargin};" />
          </div>
        `;
			}
			case "TitleBlock":
				return `
          <div style="color: ${block.props.color}; font-size: ${block.props.fontSize}px; text-align: ${block.props.align}; font-weight: bold; padding: ${block.props.padding}px;">
            ${block.props.text}
          </div>
        `;
			case "SpacerBlock":
				return `
          <div style="height: ${block.props.size}px; background-color: ${block.props.transparentBg ? "transparent" : "#ffffff"};"></div>
        `;
			case "PreheaderBlock":
				return `
          <div style="padding: ${block.props.padding}px; text-align: center; font-size: 12px; color: #666666;">
            <div>${block.props.previewText}</div>
            <div style="margin-top: 5px;">
              <a href="${block.props.webVersionLink}" style="color: #666666;">View in browser</a> | 
              <a href="${block.props.unsubscribeLink}" style="color: #666666;">Unsubscribe</a>
            </div>
          </div>
        `;
			case "FooterBlock":
				return `
          <div style="padding: ${block.props.padding}px; text-align: center; font-size: 12px; color: #999999;">
            ${block.props.content}
          </div>
        `;
			case "SocialBlock": {
				const networks = (block.props.networks || "facebook,twitter,instagram")
					.split(",")
					.map((n: string) => n.trim());
				const socialItems = networks
					.map(
						(n: string) => `
          <a href="#" style="display: inline-block; margin: 0 5px; color: #333333; text-decoration: none;">${n}</a>
        `,
					)
					.join("");
				return `
          <div style="padding: ${block.props.padding}px; text-align: ${block.props.align};">
            ${socialItems}
          </div>
        `;
			}
			case "DoubleImageBlock":
				return `
          <div style="display: flex; padding: ${block.props.padding}px; gap: ${block.props.gutterVisible ? "10px" : "0"};">
            <div style="flex: 1;"><img src="${block.props.img1Src}" style="width: 100%; display: block;" /></div>
            <div style="flex: 1;"><img src="${block.props.img2Src}" style="width: 100%; display: block;" /></div>
          </div>
        `;
			case "TripleImageBlock":
				return `
          <div style="display: flex; padding: ${block.props.padding}px; gap: ${block.props.gutterVisible ? "10px" : "0"};">
            <div style="flex: 1;"><img src="${block.props.img1Src}" style="width: 100%; display: block;" /></div>
            <div style="flex: 1;"><img src="${block.props.img2Src}" style="width: 100%; display: block;" /></div>
            <div style="flex: 1;"><img src="${block.props.img3Src}" style="width: 100%; display: block;" /></div>
          </div>
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
						const align = isUser ? "flex-end" : "flex-start";
						return `
            <div style="display: flex; justify-content: ${align}; margin-bottom: 10px;">
              <div style="background-color: ${bgColor}; color: ${textColor}; padding: 10px; border-radius: 10px; max-width: 80%;">
                ${m.text}
              </div>
            </div>
          `;
					})
					.join("");
				return `
          <div style="padding: ${block.props.padding}px;">
            ${msgHtml}
          </div>
        `;
			}
			case "SingleArticleBlock": {
				const singleBtnTextColor = getContrastColor(
					block.props.buttonBgColor || "#2563eb",
				);
				return `
          <div style="padding: ${block.props.padding}px;">
            <img src="${block.props.imageSrc}" style="width: 100%; display: block; margin-bottom: 10px;" />
            <h2 style="font-size: 20px; margin: 0 0 10px 0;">${block.props.title}</h2>
            <p style="font-size: 14px; margin: 0 0 10px 0;">${block.props.text}</p>
            <a href="${block.props.buttonLink}" style="display: inline-block; padding: 8px 16px; background-color: ${block.props.buttonBgColor || "#2563eb"}; color: ${singleBtnTextColor}; text-decoration: none; border-radius: 4px;">${block.props.buttonText}</a>
          </div>
        `;
			}
			case "SideArticleBlock": {
				const sideBtnTextColor = getContrastColor(
					block.props.buttonBgColor || "#2563eb",
				);
				const imgCol = `
          <div style="flex: 1;">
            <img src="${block.props.imageSrc}" style="width: 100%; display: block;" />
          </div>
        `;
				const textCol = `
          <div style="flex: 1; padding: 0 10px;">
            <h2 style="font-size: 20px; margin: 0 0 10px 0;">${block.props.title}</h2>
            <p style="font-size: 14px; margin: 0 0 10px 0;">${block.props.text}</p>
            <a href="${block.props.buttonLink}" style="display: inline-block; padding: 8px 16px; background-color: ${block.props.buttonBgColor || "#2563eb"}; color: ${sideBtnTextColor}; text-decoration: none; border-radius: 4px;">${block.props.buttonText}</a>
          </div>
        `;
				return `
          <div style="display: flex; padding: ${block.props.padding}px; align-items: center;">
            ${block.props.imagePos === "left" ? imgCol + textCol : textCol + imgCol}
          </div>
        `;
			}
			case "DoubleArticleBlock":
				return `
          <div style="padding: ${block.props.padding}px; background-color: #ffffff;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="50%" valign="top" style="padding-right: 10px;">
                  ${renderZone(`${block.props.id}:left-article`)}
                </td>
                <td width="50%" valign="top" style="padding-left: 10px;">
                  ${renderZone(`${block.props.id}:right-article`)}
                </td>
              </tr>
            </table>
          </div>
        `;
			case "TripleArticleBlock":
				return `
          <div style="padding: ${block.props.padding}px; background-color: #ffffff;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="33.33%" valign="top" style="padding-right: 10px;">
                  ${renderZone(`${block.props.id}:left-article`)}
                </td>
                <td width="33.33%" valign="top" style="padding: 0 5px;">
                  ${renderZone(`${block.props.id}:middle-article`)}
                </td>
                <td width="33.33%" valign="top" style="padding-left: 10px;">
                  ${renderZone(`${block.props.id}:right-article`)}
                </td>
              </tr>
            </table>
          </div>
        `;
			case "LegalPreviewBlock":
				return `
          <div style="padding: ${block.props.padding}px; text-align: center;">
            <img src="${block.props.imageSrc}" alt="${block.props.altText}" style="max-width: 100%; display: block; margin: 0 auto 10px auto;" />
            <div style="font-size: 10px; color: #999999;">${block.props.legalText}</div>
          </div>
        `;
			case "RatingBlock": {
				const isNPS = block.props.scale === "10";
				const items = Array.from({ length: isNPS ? 11 : 5 }).map((_, i) =>
					isNPS ? i : i + 1,
				);

				const ratingButtons = items
					.map((item) => {
						if (isNPS) {
							return `<a href="#" style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background-color: #f1f5f9; color: ${block.props.color}; border: 1px solid #cbd5e1; border-radius: 4px; text-decoration: none; font-size: 16px; font-weight: bold;">${item}</a>`;
						} else {
							return `<a href="#" style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background-color: transparent; color: #fbbf24; border: none; border-radius: 0; text-decoration: none; font-size: 32px; font-weight: bold;">★</a>`;
						}
					})
					.join("");

				const npsLabels = isNPS
					? `
          <div style="display: flex; justify-content: space-between; max-width: 480px; margin: 10px auto 0; font-size: 12px; color: #64748b;">
            <span>Not likely</span>
            <span>Very likely</span>
          </div>
        `
					: "";

				return `
          <div style="padding: ${block.props.padding}px; background-color: ${block.props.bgColor}; text-align: center; font-family: sans-serif;">
            <h3 style="margin: 0 0 15px 0; color: #333333; font-size: 18px;">${block.props.question}</h3>
            <div style="display: inline-flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
              ${ratingButtons}
            </div>
            ${npsLabels}
          </div>
        `;
			}
			case "EventInvitePreset": {
				const eventBtnTextColor = getContrastColor(block.props.buttonBgColor);
				return `
          <div style="padding: ${block.props.padding}px; background-color: ${block.props.bgColor}; border-radius: 8px; text-align: center; font-family: sans-serif;">
            <h2 style="font-size: 24px; color: #0f172a; margin: 0 0 15px 0;">${block.props.eventName}</h2>
            <div style="display: inline-block; text-align: left; background-color: #ffffff; padding: 15px 25px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <p style="margin: 0 0 8px 0; font-size: 15px; color: #334155;">📅 <strong>Date:</strong> ${block.props.date}</p>
              <p style="margin: 0 0 8px 0; font-size: 15px; color: #334155;">⏰ <strong>Time:</strong> ${block.props.time}</p>
              <p style="margin: 0; font-size: 15px; color: #334155;">📍 <strong>Location:</strong> ${block.props.location}</p>
            </div>
            <p style="font-size: 16px; color: #475569; line-height: 1.5; margin: 0 auto 20px auto; max-width: 500px;">${block.props.description}</p>
            <a href="${block.props.buttonLink}" style="display: inline-block; padding: 12px 24px; background-color: ${block.props.buttonBgColor}; color: ${eventBtnTextColor}; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">${block.props.buttonText}</a>
          </div>
        `;
			}
			case "PromoBannerPreset":
				return `
          <div style="padding: ${block.props.padding}px; background-color: ${block.props.bgColor}; color: ${block.props.textColor}; text-align: center; font-family: sans-serif;">
            <div style="display: inline-block; border: 2px solid ${block.props.textColor}; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-bottom: 15px; letter-spacing: 1px;">${block.props.discount}</div>
            <h2 style="font-size: 32px; margin: 0 0 10px 0; font-weight: 900; text-transform: uppercase;">${block.props.title}</h2>
            <p style="font-size: 18px; margin: 0 0 20px 0; opacity: 0.9;">${block.props.subtitle}</p>
            <a href="${block.props.buttonLink}" style="display: inline-block; padding: 12px 30px; background-color: ${block.props.textColor}; color: ${block.props.bgColor}; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; text-transform: uppercase;">${block.props.buttonText}</a>
          </div>
        `;
			case "TestimonialPreset": {
				const stars = Array.from({ length: 5 })
					.map(
						(_, i) =>
							`<span style="color: ${i < block.props.rating ? "#fbbf24" : "#e2e8f0"}; font-size: 20px;">★</span>`,
					)
					.join("");
				return `
          <div style="padding: ${block.props.padding}px; background-color: ${block.props.bgColor}; border-radius: 8px; border: 1px solid #e2e8f0; font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="margin-bottom: 15px;">${stars}</div>
            <p style="font-size: 18px; color: #1e293b; font-style: italic; line-height: 1.6; margin: 0 0 20px 0;">"${block.props.quote}"</p>
            <div style="display: flex; align-items: center; gap: 15px;">
              <img src="${block.props.avatarSrc}" alt="${block.props.authorName}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" />
              <div>
                <h4 style="margin: 0 0 4px 0; font-size: 16px; color: #0f172a;">${block.props.authorName}</h4>
                <p style="margin: 0; font-size: 14px; color: #64748b;">${block.props.authorRole}</p>
              </div>
            </div>
          </div>
        `;
			}
			case "FeatureAnnouncementPreset": {
				const featBtnTextColor = getContrastColor(block.props.buttonBgColor);
				return `
          <div style="padding: ${block.props.padding}px; background-color: ${block.props.bgColor}; font-family: sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
              <div style="display: inline-block; background-color: #e0e7ff; color: #4338ca; padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 0.5px;">${block.props.badgeText}</div>
              <h2 style="font-size: 28px; color: #111827; margin: 0 0 15px 0; font-weight: bold;">${block.props.title}</h2>
              <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0 0 25px 0;">${block.props.description}</p>
              <img src="${block.props.imageSrc}" alt="Feature" style="width: 100%; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); margin-bottom: 25px;" />
              <a href="${block.props.buttonLink}" style="display: inline-block; padding: 12px 24px; background-color: ${block.props.buttonBgColor}; color: ${featBtnTextColor}; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">${block.props.buttonText}</a>
            </div>
          </div>
        `;
			}
			case "CountdownTimer":
				return `
          <div style="text-align: center; padding: ${block.props.padding}px; background-color: ${block.props.bgColor}; color: ${block.props.color}; border-radius: 8px; font-family: monospace; font-size: 24px; font-weight: bold;">
            <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Offer Ends: ${block.props.endDate}</div>
            <div style="display: flex; justify-content: center; gap: 15px; margin-top: 10px;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <span>00</span>
                <span style="font-size: 10px; font-weight: normal;">DAYS</span>
              </div>
              <span>:</span>
              <div style="display: flex; flex-direction: column; align-items: center;">
                <span>00</span>
                <span style="font-size: 10px; font-weight: normal;">HRS</span>
              </div>
              <span>:</span>
              <div style="display: flex; flex-direction: column; align-items: center;">
                <span>00</span>
                <span style="font-size: 10px; font-weight: normal;">MIN</span>
              </div>
              <span>:</span>
              <div style="display: flex; flex-direction: column; align-items: center;">
                <span>00</span>
                <span style="font-size: 10px; font-weight: normal;">SEC</span>
              </div>
            </div>
          </div>
        `;
			case "GamifiedPopupPreset":
				return `
          <div style="padding: ${block.props.padding}px; background-color: ${block.props.bgColor}; color: ${block.props.textColor}; text-align: center; font-family: sans-serif; border-radius: 12px; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -20px; left: -20px; width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.1);"></div>
            <div style="position: absolute; bottom: -40px; right: -20px; width: 150px; height: 150px; border-radius: 50%; background: rgba(255,255,255,0.1);"></div>
            <div style="position: relative; z-index: 1;">
              <div style="font-size: 64px; margin-bottom: 10px;">🎡</div>
              <h2 style="font-size: 36px; margin: 0 0 15px 0; font-weight: 900;">${block.props.title}</h2>
              <p style="font-size: 16px; margin: 0 auto 25px auto; max-width: 80%; opacity: 0.9; line-height: 1.5;">${block.props.subtitle}</p>
              <div style="display: flex; flex-direction: column; gap: 10px; max-width: 300px; margin: 0 auto;">
                <input type="email" placeholder="Enter your email address" style="padding: 12px 15px; border-radius: 6px; border: none; font-size: 16px; width: 100%; box-sizing: border-box;" />
                <button style="padding: 14px 20px; background-color: #f59e0b; color: #ffffff; border: none; border-radius: 6px; font-weight: bold; font-size: 18px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">${block.props.buttonText}</button>
              </div>
              <div style="margin-top: 15px; font-size: 12px; opacity: 0.7;">
                <a href="#" style="color: inherit; text-decoration: underline;">No thanks, I don't want to win</a>
              </div>
            </div>
          </div>
        `;
			default:
				return "";
		}
	};

	const rawHtml = data.content.map(renderBlock).join("");

	// Sanitize the HTML to ensure it's safe to inject via dangerouslySetInnerHTML or v-html
	// We allow styling and standard tags, but strip out any malicious scripts or event handlers.
	return DOMPurify.sanitize(rawHtml, {
		ALLOWED_TAGS: [
			"div",
			"span",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"p",
			"a",
			"img",
			"hr",
			"br",
			"strong",
			"em",
			"b",
			"i",
			"u",
			"s",
			"ul",
			"ol",
			"li",
			"table",
			"tbody",
			"thead",
			"tr",
			"td",
			"th",
		],
		ALLOWED_ATTR: [
			"style",
			"href",
			"src",
			"alt",
			"width",
			"height",
			"target",
			"rel",
			"class",
			"id",
			"cellpadding",
			"cellspacing",
			"border",
			"valign",
		],
	});
}

export function generateStandaloneHtml(data: Data): string {
	const html = generateHtml(data);
	const rootProps = (data.root?.props as any) || {};
	const _bgColor = rootProps.backgroundColor || "transparent";
	const title = rootProps.title || "On-Site Notification";
	const displayFormat = rootProps.displayFormat || "inline";
	const triggerType = rootProps.triggerType || "immediate";
	const triggerValue = rootProps.triggerValue || 0;
	const fontFamily = rootProps.fontFamily || "Arial, sans-serif";
	const textColor = rootProps.textColor || "#333333";

	let formatCss = "";
	if (displayFormat === "lightbox") {
		formatCss = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;
      z-index: 999999;
    `;
	} else if (displayFormat === "floatingBar") {
		formatCss = `
      position: fixed; bottom: 0; left: 0; width: 100vw;
      z-index: 999999; box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    `;
	} else if (displayFormat === "slideIn") {
		formatCss = `
      position: fixed; bottom: 20px; right: 20px; width: 350px;
      z-index: 999999; box-shadow: 0 4px 20px rgba(0,0,0,0.15); border-radius: 8px;
    `;
	}

	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: sans-serif;">
  <div style="padding: 40px; text-align: center; color: #6b7280;">
    <h1>Host Website Simulation</h1>
    <p>This page simulates a host website. The widget is embedded using Web Components and Shadow DOM.</p>
    <p>Scroll down or move your mouse out of the window to test triggers.</p>
    <div style="height: 2000px;"></div>
  </div>

  <!-- Injected Web Component -->
  <martech-widget></martech-widget>

  <script>
    class MartechWidget extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = \`
          <style>
            :host {
              display: none; /* Hidden by default until triggered */
              \${'${formatCss.replace(/\n/g, " ")}'}
            }
            .widget-container {
              background-color: ${displayFormat === "inline" ? "transparent" : "#ffffff"};
              width: 100%;
              max-width: ${displayFormat === "lightbox" ? "600px" : "100%"};
              margin: 0 auto;
              box-sizing: border-box;
              border-radius: ${displayFormat === "lightbox" || displayFormat === "slideIn" ? "12px" : "0"};
              overflow: hidden;
            }
            /* Reset styles inside shadow DOM to prevent bleeding */
            * { box-sizing: border-box; font-family: ${fontFamily}; color: ${textColor}; }
            img { max-width: 100%; height: auto; }
          </style>
          <div class="widget-container">
            ${html.replace(/`/g, "\\`")}
          </div>
        \`;
      }

      connectedCallback() {
        this.setupTriggers();
      }

      setupTriggers() {
        const triggerType = "${triggerType}";
        const triggerValue = ${triggerValue};
        const displayFormat = "${displayFormat}";

        const showWidget = () => {
          this.style.display = displayFormat === 'lightbox' ? 'flex' : 'block';
        };

        if (triggerType === "immediate") {
          showWidget();
        } else if (triggerType === "timeDelay") {
          setTimeout(showWidget, triggerValue * 1000);
        } else if (triggerType === "exitIntent") {
          document.addEventListener("mouseleave", (e) => {
            if (e.clientY < 0) showWidget();
          }, { once: true });
        } else if (triggerType === "scrollDepth") {
          window.addEventListener("scroll", () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent >= triggerValue) {
              showWidget();
            }
          });
        }
      }
    }
    customElements.define('martech-widget', MartechWidget);
  </script>
</body>
</html>`;
}
